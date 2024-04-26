/**
 * Web Audio buffer player emulating the behavior of an HTML5 Audio element.
 */
class WebAudioPlayer {
  private audioContext: AudioContext
  private gainNode: GainNode
  private bufferNode: AudioBufferSourceNode | null = null
  private listeners: Map<string, Set<() => void>> = new Map()
  private autoplay = false
  private playStartTime = 0
  private playedDuration = 0
  private _src = ''
  private _duration: number | 0 = 0
  private _muted = false
  private buffer: AudioBuffer | null = null
  public paused = true
  public crossOrigin: string | null = null
  public isChangeSpeed = false;



  constructor(audioContext = new AudioContext()) {
    this.audioContext = audioContext

    this.gainNode = this.audioContext.createGain()
    this.gainNode.connect(this.audioContext.destination)

  }

  addEventListener(event: string, listener: () => void, options?: { once?: boolean }) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)?.add(listener)

    if (options?.once) {
      const onOnce = () => {
        this.removeEventListener(event, onOnce)
        this.removeEventListener(event, listener)
      }
      this.addEventListener(event, onOnce)
    }
  }

  removeEventListener(event: string, listener: () => void) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)?.delete(listener)
    }
  }

  private emitEvent(event: string) {
    this.listeners.get(event)?.forEach((listener) => listener())
  }

  get src() {
    return this._src
  }

  set src(value: string) {
    this._src = value

    if (!value) {
      this.buffer = null
      this._duration = 0
      this.emitEvent('emptied')
      return
    }

    fetch(value)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        if (this.src !== value) return null
        return this.audioContext.decodeAudioData(arrayBuffer)
      })
      .then((audioBuffer) => {
        if (this.src !== value || !audioBuffer) return null

        this.buffer = audioBuffer
        this._duration = audioBuffer.duration

        this.emitEvent('loadedmetadata')
        this.emitEvent('canplay')

        if (this.autoplay) {
          this.play()
        }
      })
  }

  getChannelData() {
    const channelData = this.buffer?.getChannelData(0)
    return channelData ? [channelData] : undefined
  }

  async play() {
    if (!this.audioContext || !this.buffer || !this.gainNode || typeof this.playedDuration !== 'number' || this.playedDuration < 0) {
      console.error("Invalid state for play");
      return;
    }
    if (!this.paused) return;

    this.paused = false
    this.bufferNode?.disconnect()
    
    this.bufferNode = this.audioContext.createBufferSource();
    this.bufferNode.buffer = this.buffer;
    this.bufferNode.connect(this.gainNode);
  
    const offset = this.playedDuration > 0 ? this.playedDuration : 0
    const start =
      this.playedDuration > 0 ? this.audioContext.currentTime : this.audioContext.currentTime - this.playedDuration

    this.bufferNode.start(start, offset)
    this.playStartTime = this.audioContext.currentTime
    this.emitEvent('play')
  }

  pause() {
    if (this.paused) return
    this.paused = true
    this.bufferNode?.stop()
    this.playedDuration += this.audioContext.currentTime - this.playStartTime
    this.emitEvent('pause')
  }

  async setSinkId(deviceId: string) {
    const ac = this.audioContext as AudioContext & { setSinkId: (id: string) => Promise<void> }
    return ac.setSinkId(deviceId)
  }

  get playbackRate() {
    return this.bufferNode?.playbackRate.value ?? 1
  }
  set playbackRate(value) {
    if (this.bufferNode) {
      this.bufferNode.playbackRate.value = value
    }
  }


  get currentTime() {
    return this.paused ? this.playedDuration : this.playedDuration + this.audioContext.currentTime - this.playStartTime
  }
  set currentTime(value) {
    this.emitEvent('seeking')

    if (this.paused) {
      this.playedDuration = value
    } else {
      this.pause()
      this.playedDuration = value
      this.play()
    }

    this.emitEvent('timeupdate')
  }

  get duration() {
    return this._duration
  }
  set duration(value: number) {
    this._duration = value
  }

  get volume() {
    return this.gainNode.gain.value
  }
  set volume(value) {
    this.gainNode.gain.value = value
    this.emitEvent('volumechange')
  }

  get muted() {
    return this._muted
  }
  set muted(value: boolean) {
    if (this._muted === value) return
    this._muted = value

    if (this._muted) {
      this.gainNode.disconnect()
    } else {
      this.gainNode.connect(this.audioContext.destination)
    }
  }
  get Buffer(): AudioBuffer | null {
    return this.buffer;
  }
  set Buffer(value: AudioBuffer | null) {
    if (value === null) {
      console.error('Value is null');
      return;
    }
  
    this.buffer = value;
    this._duration = value.duration;
  }
  async cutSegment(startSec: number, endSec: number) {
    if (!this.buffer) 
      {
        console.log("No buffer to remove segment from");
        return;
      }
      if (typeof startSec !== 'number' || typeof endSec !== 'number') {
        console.error("Start and end position is NaN", startSec, endSec)
        return;
      }
      const startOffset = Math.round(startSec * this.buffer.sampleRate);
      const endOffset = Math.round(endSec * this.buffer.sampleRate);
      const segmentLength = Math.round(endOffset - startOffset);

    //console.log("startOffset: ", startOffset, "endOffset: ", endOffset, "newLength: ", newLength);

    if (startOffset < 0 || endOffset > this.buffer.length || startOffset >= endOffset || segmentLength <= 0) {
      console.error('Invalid segment range. The start and end offsets must be within the buffer length and the start offset must be less than the end offset.');
      return;
    }
  
    const newBuffer = this.audioContext.createBuffer(
      this.buffer.numberOfChannels,
      segmentLength,
      this.buffer.sampleRate
    );
  
    for (let channel = 0; channel < this.buffer.numberOfChannels; channel++) {
      const oldData = this.buffer.getChannelData(channel);
      const newData = newBuffer.getChannelData(channel);
      newData.set(oldData.subarray(startOffset, endOffset), 0);
    }
  
    this.buffer = newBuffer;
    this._duration = this.buffer.duration;

    //this.emitEvent('modified');
  }

  async removeSegment(startSec: number, endSec: number) {
    if (!this.buffer) 
      {
        console.log("No buffer to remove segment from");
        return;
      }
      if (typeof startSec !== 'number' || typeof endSec !== 'number') {
        console.error("Start and end position is NaN", startSec, endSec)
        return;
      }
      const startOffset = Math.round(startSec * this.buffer.sampleRate);
      const endOffset = Math.round(endSec * this.buffer.sampleRate);
      const newLength = Math.max(Math.round(this.buffer.length - (endOffset - startOffset)), 1);

    //console.log("startOffset: ", startOffset, "endOffset: ", endOffset, "newLength: ", newLength);

    if(startOffset < 0 || endOffset > this.buffer.length || startOffset >= endOffset || newLength <= 0) {
      console.error('Invalid segment range. The start and end offsets must be within the buffer length and the start offset must be less than the end offset.');
      return;
    }
    const newBuffer = this.audioContext.createBuffer(
      this.buffer.numberOfChannels,
      newLength,
      this.buffer.sampleRate
    );

    for (let channel = 0; channel < this.buffer.numberOfChannels; channel++) {
      const oldData = this.buffer.getChannelData(channel);
      const newData = newBuffer.getChannelData(channel);
      newData.set(oldData.subarray(0, startOffset), 0);
      newData.set(oldData.subarray(endOffset), startOffset);
    }

    this.buffer = newBuffer;
    this._duration = this.buffer.duration;

    //this.emitEvent('modified');
  }

  async muteSegment(startSec: number, endSec: number) {
    if (!this.buffer) {
        console.log("No buffer to process");
        return;
    }

    if (typeof startSec !== 'number' || typeof endSec !== 'number') {
        console.error("Start and end position is NaN", startSec, endSec);
        return;
    }

    const startOffset = Math.round(startSec * this.buffer.sampleRate);
    const endOffset = Math.round(endSec * this.buffer.sampleRate);

    if (startOffset < 0 || endOffset > this.buffer.length || startOffset >= endOffset) {
        console.error('Invalid segment range. The start and end offsets must be within the buffer length and the start offset must be less than the end offset.');
        return;
    }

    // Wyciszanie segmentu w każdym kanale
    for (let channel = 0; channel < this.buffer.numberOfChannels; channel++) {
        const channelData = this.buffer.getChannelData(channel);
        for (let i = startOffset; i < endOffset; i++) {
            channelData[i] = 0; // Ustawienie wartości próbek na 0
        }
    }

  }

  async reverseSegment(startSec: number, endSec: number) {
    if (!this.buffer) {
        console.log("No buffer to process");
        return;
    }

    if (typeof startSec !== 'number' || typeof endSec !== 'number') {
        console.error("Start and end position is NaN", startSec, endSec);
        return;
    }
    let newBuffer = this.audioContext.createBuffer(this.buffer.numberOfChannels, this.buffer.length, this.buffer.sampleRate);

    // Kopiowanie danych z oryginalnego AudioBuffer do nowego
    for (let channel = 0; channel < this.buffer.numberOfChannels; channel++) {
      newBuffer.copyToChannel(this.buffer.getChannelData(channel), channel);
    }
    const startOffset = Math.round(startSec * this.buffer.sampleRate);
    const endOffset = Math.round(endSec * this.buffer.sampleRate);

    if (startOffset < 0 || endOffset > this.buffer.length || startOffset >= endOffset) {
        console.error('Invalid segment range. The start and end offsets must be within the buffer length and the start offset must be less than the end offset.');
        return;
    }

    // Odwracanie segmentu w każdym kanale
    for (let channel = 0; channel < newBuffer.numberOfChannels; channel++) {
      const channelData = newBuffer.getChannelData(channel);
      for (let i = startOffset, j = endOffset - 1; i < j; i++, j--) {
        [channelData[i], channelData[j]] = [channelData[j], channelData[i]];
      }
    }
    this.buffer = newBuffer;
    this._duration = this.buffer.duration;
    //console.log("Segment from " + startSec + "s to " + endSec + "s has been muted.");
    //this.emitEvent('modified');
  }

  async speedSegment(startSec: number, endSec: number, speedFactor: number) {
    if (!this.buffer) {
        console.log("No buffer to process");
        return;
    }

    if (typeof startSec !== 'number' || (endSec !== null && typeof endSec !== 'number') || typeof speedFactor !== 'number') {
        console.error("Invalid input types", startSec, endSec, speedFactor);
        return;
    }

    const startOffset = Math.round(startSec * this.buffer.sampleRate);
    const endOffset = endSec ? Math.round(endSec * this.buffer.sampleRate) : this.buffer.length;

    if (startOffset < 0 || endOffset > this.buffer.length || startOffset >= endOffset) {
        console.error('Invalid segment range.');
        return;
    }
    if (speedFactor <= 0) {
      console.error("Invalid speed factor", speedFactor);
      return;
    }

    let newLength = Math.round((endOffset - startOffset) / speedFactor) + (this.buffer.length - (endOffset - startOffset));
    if (newLength <= 0 || isNaN(newLength) ) {
      console.error('Invalid new length for the buffer.');
      return;
    }
    console.log("New length: ", newLength, "channels", this.buffer.numberOfChannels, "sample rate", this.buffer.sampleRate)
    let newBuffer = this.audioContext.createBuffer(this.buffer.numberOfChannels, newLength, this.buffer.sampleRate);
    function cubicInterpolate(y0: number, y1: number, y2: number, y3: number, mu: number) {
      let a0, a1, a2, a3, mu2;
  
      mu2 = mu * mu;
      a0 = y3 - y2 - y0 + y1;
      a1 = y0 - y1 - a0;
      a2 = y2 - y0;
      a3 = y1;
  
      return (a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3);
    }

    for (let channel = 0; channel < this.buffer.numberOfChannels; channel++) {
        let newChannelData = newBuffer.getChannelData(channel);
        let oldChannelData = this.buffer.getChannelData(channel);

        // Kopiowanie danych przed segmentem
        for (let i = 0; i < startOffset; i++) {
            newChannelData[i] = oldChannelData[i];
        }

      // Przekopiowanie i przyspieszenie segmentu
      for (let i = startOffset, j = 0; i < endOffset; i += speedFactor, j++) {
        let i0 = Math.floor(i);
        let i1 = Math.min(Math.ceil(i), endOffset - 1);
        let i2 = Math.min(i1 + 1, endOffset - 1);
        let i3 = Math.min(i2 + 1, endOffset - 1);
        let fraction = i - i0;

        if (i < endOffset && j + startOffset < newLength) {
          newChannelData[j + startOffset] = cubicInterpolate(
            oldChannelData[i0],
            oldChannelData[i1],
            oldChannelData[i2],
            oldChannelData[i3],
            fraction
          );
        }
  }

        // Kopiowanie danych po segmencie
        for (let i = endOffset, j = startOffset + Math.round((endOffset - startOffset) / speedFactor); i < this.buffer.length && j < newLength; i++, j++) {
            newChannelData[j] = oldChannelData[i];
        }
    }

    this.buffer = newBuffer;
    this._duration = this.buffer.duration;
}
  

}



export default WebAudioPlayer

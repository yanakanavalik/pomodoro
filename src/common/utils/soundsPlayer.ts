export enum Sounds {
  start = "start",
  end = "end",
}

export class SoundsPlayer {
  static startAudio: HTMLAudioElement = new Audio(
    "https://storage.cloud.google.com/pomodoro_yanak/end-iteration.wav"
  );
  static endAudio: HTMLAudioElement = new Audio(
    "https://storage.cloud.google.com/pomodoro_yanak/start-iteration.wav"
  );

  static playSound = (soundType: Sounds) => {
    let currentAudio;

    switch (soundType) {
      case Sounds.end:
        currentAudio = SoundsPlayer.endAudio;
        break;
      case Sounds.start:
      default:
        currentAudio = SoundsPlayer.startAudio;
        break;
    }

    currentAudio.autoplay = true;
    currentAudio.play().then();
    return true;
  };
}

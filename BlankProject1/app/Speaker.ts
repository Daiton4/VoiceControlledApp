import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';

export class Speaker {
    private tts: TNSTextToSpeech;
    private speakOptions: SpeakOptions;

    constructor() {
        this.init();
    }

    init(): any {
        this.tts = new TNSTextToSpeech();
        this.speakOptions = {
            text: '', /// *** required ***
            speakRate: 0.75, // optional - default is 1.0
            pitch: 1.0, // optional - default is 1.0
            volume: 1.0, // optional - default is 1.0
            locale: "en-US",  // optional - default is system locale,
            finishedCallback: Function // optional
        }
        this.tts.speak(this.speakOptions).then(() => {
        }, (err) => {
            console.log("speach error:", err);
        });
    }

    setCallback(func: Function) {
        this.speakOptions.finishedCallback = func;
    }

    speakText(text: string) {
        this.speakOptions.text = text;
        this.tts.speak(this.speakOptions).then(() => {
        }, (err) => {
            console.log("speach error:", err);
        });
    }

    stopSpeach() {
        this.tts.pause();
        this.tts.destroy();
        this.init();
    }
}
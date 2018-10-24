import { SpeechRecognition, SpeechRecognitionTranscription } from "nativescript-speech-recognition";

export class VoiceController {

    speechRecognition: SpeechRecognition;

    constructor() {
        this.speechRecognition = new SpeechRecognition();
    }

    isAvailable(): boolean {
        var result = false;

        this.speechRecognition.available().then(
            (available: boolean) => result = available,
            (err: string) => console.log(err)
        );

        return result;
    }

    listenForSpecificCommand(command: string, callback: (command: string, commandSuccess: boolean) => void) {
        this.speechRecognition.startListening(
            {
                locale: "en-US",
                returnPartialResults: false,
                onResult: (transcription: SpeechRecognitionTranscription) => {
                    callback(command, transcription.text.indexOf(command) > -1);
                },
                onError: (error: string | number) => {
                    callback(error + " error", false);
                }
            }
        ).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
        ).catch((error: string | number) => {
        });
    }

    listenForCommand(commands: string[], callback: (command: string, commandSuccess: boolean) => void) {
        this.speechRecognition.startListening(
            {
                locale: "en-US",
                returnPartialResults: false,
                onResult: (transcription: SpeechRecognitionTranscription) => {
                    var text = transcription.text.replace(/\s/g, "");
                    for (let item of commands) {
                        if (text.indexOf(item.toLowerCase()) > -1) {
                            callback(item, true);
                            return;
                        }
                    }
                    callback("nothing found", false);
                },
                onError: (error: string | number) => {
                    callback(error + " error", false);
                }
            }
        ).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
        ).catch((error: string | number) => {
        });
    }

    listenForText(callback: (text: string, success: boolean) => void) {
        this.speechRecognition.startListening(
            {
                locale: "en-US",
                returnPartialResults: false,
                onResult: (transcription: SpeechRecognitionTranscription) => {
                    callback(transcription.text, true);
                },
                onError: (error: string | number) => {
                    callback(error + " error", false);
                }
            }
        ).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
        ).catch((error: string | number) => {
        });

    }

    stopListening() {
        this.speechRecognition.stopListening().then(
            () => { console.log(`stopped listening`) },
            (errorMessage: string) => { console.log(`Stop error: ${errorMessage}`); }
        );
    }
}
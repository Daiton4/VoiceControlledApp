import { Speaker } from "~/Speaker";
import { FileSystemNavigator } from "~/FileSystemNavigator";
import { VoiceController } from "~/VoiceController";
import { FileSystemEntity, Folder } from "tns-core-modules/file-system/file-system";

enum Commands {
    Start,
    ListFiles,
    GoBack,
    SelectFile,
    Delete,
    Open,
    Copy,
    Cut,
    Paste
}

export class Commander {
    private navigator: FileSystemNavigator = new FileSystemNavigator();
    private commandList: string[] = Object.keys(Commands).filter(key => typeof Commands[key as any] === "number");
    voiceController: VoiceController = new VoiceController();
    fileListCallback: (file: FileSystemEntity[]) => void;
    speaker: Speaker = new Speaker();

    initialize() {
        this.runNextCommand();
    }

    runNextCommand(command: Commands = Commands.Start) {
        switch (command) {
            case Commands.Start:
                this.onStartCommand();
                break;
            case Commands.ListFiles:
                this.onListFiles();
                break;
            case Commands.GoBack:
                this.onGoBack();
                break;
            default:
                console.log(command);
        }
    }

    onGoBack() {
        this.navigator.goBack();
        this.onListFiles();
    }

    onListFiles() {
        this.navigator.getFileList(this.navigator.current, (files: FileSystemEntity[]) => {
            this.fileListCallback(files);

            var fileList = "";
            for (let file of files) {
                fileList = fileList.concat(file.name + " ,\n");
            }
            this.speaker = new Speaker();
            this.speaker.setCallback(() =>
                this.voiceController.listenForCommand(
                    this.commandList,
                    (command, success) => {
                        if (success) {
                            this.runNextCommand(Commands[command]);
                        } else {
                            this.retryCommand();
                        }
                    }
                ));
            this.speaker.speakText("There are files: " + fileList);
        });
    }

    retryCommand() {
        console.log('chyba');
    }

    onStartCommand() {
        this.speaker = new Speaker();
        this.speaker.setCallback(() =>
            this.voiceController.listenForCommand(
                this.commandList,
                (command, success) => {
                    if (success) {
                        this.runNextCommand(Commands[command]);
                    } else {
                        this.retryCommand();
                    }
                }
            ));
        this.speaker.speakText('Welcome to my test App. Tell it what to do after beep.');
    }
}
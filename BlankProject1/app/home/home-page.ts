/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { NavigatedData, Page, EventData, View, getViewById } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { HomeViewModel } from "./home-view-model";
import { VoiceController } from "~/VoiceController";
import { Commander } from "~/Commander";
import { FileSystemNavigator } from "~/FileSystemNavigator";
import { Frame } from "tns-core-modules/ui/frame/frame";
import { fromObject } from "tns-core-modules/data/observable/observable";
import { android } from "tns-core-modules/application/application";
import { path, Folder } from "tns-core-modules/file-system/file-system";
import { SpeechRecognition } from "nativescript-speech-recognition";
import { TNSTextToSpeech } from "nativescript-texttospeech";
import { BindingOptions, Binding } from "ui/core/bindable/bindable";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
}

export function onNavigatedTo(args) {
    const page = <Page>args.object;
}

export function onTap(args: EventData) {
    const commander = new Commander();
    commander.voiceController.isAvailable();
    commander.fileListCallback = (files) => {
        (<Button>args.object).page.bindingContext = fromObject(
            {
                currentFiles: files
            }
        )
    }
    commander.initialize();
}

export function onListViewLoaded(args: EventData) {
    const listView = <ListView>args.object;
}

export function onStopTap(args: EventData) {
    //Commander.speaker.stopSpeach();
}

export function onItemTap(args: ItemEventData) {
}

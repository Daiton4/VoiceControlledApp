import { knownFolders, Folder, File, FileSystemEntity } from "tns-core-modules/file-system";
import { isAndroid,isIOS } from "tns-core-modules/platform";
import { android } from "tns-core-modules/application/application";

export class FileSystemNavigator {
    current: Folder;

    constructor() {
        if (isAndroid) {
            this.current = <Folder>Folder.fromPath(android.currentContext.getExternalFilesDir(null).getAbsolutePath());
        }
        if (isIOS) {
            this.current = <Folder>knownFolders.ios.library();
        }
    }

    getDocumentsFolder(): Folder{
        return <Folder>knownFolders.documents();
    }

    getFileList(folder: Folder = this.current, callback: (file: FileSystemEntity[]) => void) {
        folder.getEntities().then(
            callback,
            (err) => console.log(err)
        );
    }

    goBack() {
        if (this.current.parent != null) {
            this.current = <Folder>this.current.parent;
        }
    }
}
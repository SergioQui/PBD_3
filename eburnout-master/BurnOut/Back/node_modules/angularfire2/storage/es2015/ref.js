import { createUploadTask } from './task';
import { from } from 'rxjs/observable/from';
export function createStorageRef(ref) {
    return {
        getDownloadURL() { return from(ref.getDownloadURL()); },
        getMetadata() { return from(ref.getMetadata()); },
        delete() { return from(ref.delete()); },
        child(path) { return createStorageRef(ref.child(path)); },
        updateMetatdata(meta) {
            return from(ref.updateMetadata(meta));
        },
        put(data, metadata) {
            const task = ref.put(data, metadata);
            return createUploadTask(task);
        },
        putString(data, format, metadata) {
            const task = ref.putString(data, format, metadata);
            return createUploadTask(task);
        }
    };
}
//# sourceMappingURL=ref.js.map
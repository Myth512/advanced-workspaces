import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class ExampleExtension extends Extension {
    callback() {
        let workspace_manager = global.workspace_manager;
        let active_workspace_index = workspace_manager.get_active_workspace_index();

        if (active_workspace_index == 3) {
            let workspace = workspace_manager.get_workspace_by_index(3);
            let windows = workspace.list_windows();
            for (const window of windows) {
                window.move_to_monitor(0);
            }
        }

        if (this.previous_workspace == 3) {
            let workspace = workspace_manager.get_workspace_by_index(3);
            let windows = workspace.list_windows();
            for (const window of windows) {
                window.move_to_monitor(1);
            }
        }

        this.previous_workspace = active_workspace_index;
    }

    enable() {
        this.previous_workspace = 0;

        this.workspaceChangedSignalId = global.workspace_manager.connect('active-workspace-changed', this.callback.bind(this));
    }

    disable() {
        global.workspace_manager.disconnect(workspaceChangedSignalId);
    }
}
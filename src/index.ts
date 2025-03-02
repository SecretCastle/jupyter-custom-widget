import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import CustomWidget from './CustomWidget';
import { INotebookTracker } from '@jupyterlab/notebook';
import { ICommandPalette } from '@jupyterlab/apputils';
import { UUID } from '@lumino/coreutils';

/**
 * Initialization data for the @jupyterlab-examples/hello-world extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab/custom-widget:plugin',
  description: 'Minimal JupyterLab extension.',
  autoStart: true,
  requires: [INotebookTracker, ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    palette: ICommandPalette
  ) => {
    const widgetId = UUID.uuid4();
    const customWidget = new CustomWidget(notebookTracker, palette);
    customWidget.id = widgetId;
    customWidget.title.label = 'haha';
    app.shell.add(customWidget, 'right', { activate: true });
  }
};

export default plugin;

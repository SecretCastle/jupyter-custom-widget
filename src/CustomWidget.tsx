import { ReactWidget } from '@jupyterlab/ui-components';
import React from 'react';
import { INotebookTracker } from '@jupyterlab/notebook';
import { ICommandPalette } from '@jupyterlab/apputils';

const Button = (props: { name: string; event: () => void }) => {
  return <button onClick={props.event}>{props.name || 'click me'}</button>;
};

class RenderWidget extends ReactWidget {
  notebookTracker: INotebookTracker;
  palette: ICommandPalette;

  constructor(notebookTracker: INotebookTracker, palette: ICommandPalette) {
    super();
    this.notebookTracker = notebookTracker;
    this.palette = palette;
  }

  render(): JSX.Element {
    const onClick = () => {
      const notebook = this.notebookTracker.currentWidget;
      if (!notebook) {
        return;
      }
      const activeCell = notebook.content.activeCell;
      if (!activeCell) {
        return;
      }
      const codeToInsert = "print('hello world')";

      if (activeCell?.model.type === 'code') {
        activeCell.model.sharedModel.source = '\n' + codeToInsert;
      }
    };
    return (
      <div>
        <Button name="点我" event={onClick} />
      </div>
    );
  }
}

export default RenderWidget;

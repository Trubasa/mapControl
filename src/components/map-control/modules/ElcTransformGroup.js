import { BaseElcNode } from "./BaseElcNode";

export class ElcTransformGroup extends BaseElcNode {
    constructor(elcCanvas, options = {}, extra = {}) {
        super();
        this.init(elcCanvas, options, extra);
    }

    init(elcCanvas, options, extra) {
        this.elcCanvas = elcCanvas;
        this.fCanvas = elcCanvas.fCanvas;
        this.extra = extra;
        this.options = {
            ...options,
        };
        this.defaultParameterProcessing(options);

        this.loadGroup();
    }

    destroy() {
        this.unRegisterListener();
        this.fCanvas.remove(this.fNode);
    }

    registerListener() {
        this.onModifiedHandle = this.onModified.bind(this);
        this.fNode.on("modified", this.onModifiedHandle);

        this.onDeselectHandle = this.onDeselect.bind(this);
        this.fNode.on("deselected", this.onDeselectHandle);
    }

    unRegisterListener() {
        if (this.fNode) {
            this.fNode.off("modified", this.onModifiedHandle);
            this.fNode.off("deselected", this.onDeselectHandle);
        }
    }

    onDeselect() {
        if (this.extra && this.extra.deselectFunc) {
            this.extra.deselectFunc();
        }
    }

    onModified(e) {
        if (this.extra && this.extra.modifiedFunc) {
            this.extra.modifiedFunc();
        }
    }

    loadGroup() {
        const group = new fabric.Group([], {
            ...this.options,
        });
        this.fNode = group;
        this.registerListener();
    }
}
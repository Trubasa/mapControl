import { BaseElcNode } from "./BaseElcNode";
import { fabric } from 'fabric'; // 确保你已经安装了fabric.js
import { constant } from "../utils/constant";

export class ElcGroup extends BaseElcNode {
    constructor(elcCanvas, elements = [], options = {}, extra = {}) {
        super();
        this.init(elcCanvas, elements, options, extra);
    }

    init(elcCanvas, elements, options, extra) {
        this.elcCanvas = elcCanvas;
        this.fCanvas = elcCanvas.fCanvas;
        this.elements = elements;
        this.extra = extra;
        this.options = {
            ...options,
        };
        this.fGroup = null
        this.defaultParameterProcessing(options);


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

    addElcNode() {

    }


}
import { BaseElcNode } from "./BaseElcNode";
import { fabric } from 'fabric'; // 确保你已经安装了fabric.js
import { constant } from "../utils/constant";
import { utils } from "../utils/utils";

export class ElcGroup extends BaseElcNode {
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
        this.fGroup = null
        this.defaultParameterProcessing(options);

        this.createGroup()
        utils.waitForCondition(() => {
            return !!this.fGroup
        }, '等待group元素加载超时').then(() => {
            this.create()
        })
    }

    createGroup() {
        this.fGroup = new fabric.Group([], {
            ...this.options
        })
        this.fNode = this.fGroup
    }

    destroy() {
        this.unRegisterListener();
        this.fCanvas.remove(this.fNode);
    }

    addElcNode(elcNode) {
        const fNode = elcNode.fNode
        this.fGroup.addWithUpdate(fNode)
    }


}
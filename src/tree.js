import { Node } from "./node";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = this.removeDuplicates(this.sortArray(array));

    return this.buildTreeRecur(sortedArray, 0, sortedArray.length - 1);
  }

  buildTreeRecur(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTreeRecur(arr, start, mid - 1);
    root.right = this.buildTreeRecur(arr, mid + 1, end);

    return root;
  }

  sortArray(array) {
    return array.sort((a, b) => a - b);
  }

  removeDuplicates(array) {
    const newArray = [];

    for (const number of array) {
      if (newArray.includes(number)) {
        continue;
      } else {
        newArray.push(number);
      }
    }

    return newArray;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (value === root.data) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }
}

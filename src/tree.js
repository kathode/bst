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

  deleteItem(value, root = this.root) {
    if (value === null) {
      return null;
    }

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    }
    if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    }
    if (value === root.data) {
      // leaf node delete right away
      if (root.left === null && root.right === null) {
        return null;
      }

      // 1 child, find the child of the target node and overide the parent with its child
      if ((root.left === null && root.right !== null) || (root.left !== null && root.right === null)) {
        root = root.left ? root.left : root.right;
        return root;
      }

      // 2 children, loop to find lowest replacement, override target and recurse to remove replacement
      if (root.left !== null && root.right !== null) {
        let successor = root.right;

        while (successor.left !== null) {
          successor = successor.left;
        }

        root.data = successor.data;
        root.right = this.deleteItem(successor.data, root.right);
      }
    }

    return root;
  }

  find(value, root = this.root) {
    if (root === null) {
      console.log("Node not found");
    } else if (value < root.data) {
      root.left = this.find(value, root.left);
    } else if (value > root.data) {
      root.right = this.find(value, root.right);
    } else if (value === root.data) {
      console.log(root);
    }
    return root;
  }

  levelOrderIteration(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  levelOrderRecurssion(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let levels = [];

    function traverse(node, depth = 0) {
      if (!node) return;

      if (!levels[depth]) levels[depth] = [];
      levels[depth].push(node);

      traverse(node.left, depth + 1);
      traverse(node.right, depth + 1);
    }

    traverse(this.root);

    callback(levels);
  }

  inOrder(callback) {
    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrder(callback) {
    function traverse(node) {
      if (node === null) return;

      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }
}

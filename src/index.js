import "./styles.css";
import { Tree } from "./tree";

const randomNumberGenerator = (n, nMax) => {
  return Array.from({ length: n }, (_, i) => Math.floor(Math.random() * nMax));
};

const randomArr = randomNumberGenerator(333, 100);

const tree = new Tree(randomArr);
console.log(tree.isBalanced());

console.log("Levelorder");
tree.levelOrderRecurssion((node) => console.log(node));
console.log("Preorder");
tree.preOrder((node) => console.log(node));
console.log("Postorder");
tree.postOrder((node) => console.log(node));
console.log("Inorder");
tree.inOrder((node) => console.log(node));

for (const num of randomNumberGenerator(10, 200)) {
  tree.insert(num);
}

console.log(tree.isBalanced());

tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.isBalanced());

console.log("Levelorder");
tree.levelOrderRecurssion((node) => console.log(node));
console.log("Preorder");
tree.preOrder((node) => console.log(node));
console.log("Postorder");
tree.postOrder((node) => console.log(node));
console.log("Inorder");
tree.inOrder((node) => console.log(node));

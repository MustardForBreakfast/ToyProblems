
// INSTRUCTIONS: Implement a map method on the provided Tree class. 
    // 1) map should take only one argument, a callback function, which in turn takes a tree node's value as its argument
    // 2) map should return a new tree with the same structure but different values as the original
    // 3) map shuld not modify the original tree.


// PROVIDED CODE: a basic Tree class that stores a value.

var Tree = function (value) {
  this.value = value;
  this.children = [];
};

//           ***   START SOLUTION   ***


Tree.prototype.map = function (callback) {
  var newTree = new Tree(callback(this.value));
  this.children.forEach(function(x){
    var newNode = x.map(callback);
    newTree.addChild(newNode);
  })
  return newTree;
};


//           ***   END SOLUTION   ***

// PROVIDED CODE: some basic methods for the Tree class

/**
  * add an immediate child
  * (wrap values in Tree nodes if they're not already)
  */
Tree.prototype.addChild = function (child) {
  if (! child ||  ! (child instanceof Tree)){
    child = new Tree(child);
  }

  if (! this.isDescendant(child)) {
    this.children.push(child);
  } else {
    throw new Error("That child is already a child of this tree");
  }
  // return the new child node for convenience
  return child;
};

/**
  * check to see if the provided tree is already a child of this
  * tree __or any of its sub trees__
  */
Tree.prototype.isDescendant = function (child) {
  if (this.children.indexOf(child) !== -1) {
    // `child` is an immediate child of this tree
    return true;
  } else {
    for (var i = 0; i < this.children.length; i++) {
      if(this.children[i].isDescendant(child)){
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

/**
  * remove an immediate child
  */
Tree.prototype.removeChild = function (child) {
  var index = this.children.indexOf(child);
  if (index !== -1) {
    // remove the child
    this.children.splice(index,1);
  } else {
    throw new Error("That node is not an immediate child of this tree");
  }
};

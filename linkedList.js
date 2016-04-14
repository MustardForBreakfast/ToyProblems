// Implement a linked list using Pseudoclassical style.

var LinkedList = function(initialValue){
  // A constructor function for linkedLists, which will themselves be comprised
  // of "node" objects.
  if (initialValue){
    var newNode = this.createNode(initialValue);
    this.tail = newNode;
    this.head = newNode;
  } else {
    this.tail = null;
    this.head = null;
  }
}

LinkedList.prototype = {
  
  addToTail : function(value){
    // Adds a new node to the list's tail and updates
    // all relevant pointers.
    var newNode = this.createNode(value);
    var oldTail = this.tail;
    
    if (oldTail){
      oldTail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
  },
  
  removeHead : function(){
    // Pops the head node off from the front of the list.
    var oldHead = this.head;
    this.head = oldHead.next;
    
    // Nullifies the tail in cases where the last
    // node has been removed from the list.
    if (this.head === null){
      this.tail = null;
    }
  }, 
  
  contains : function(value){
    // Traverses list from head to tail checking for the presence
    // of a searched value. Returns a bool accordingly.
    var current = this.head;
    while (current){
      if (current.value === value){
        return true;
      } else {
        current = current.next;
      }
    }
    return false;
  },
  
  createNode : function(value){
    // Generates a new node object with a given value.
    return {
      'value' : value,
      'next' : null
    }
  }
}

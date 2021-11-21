// Binary logic simulator

import "./queue"

class Logic {
    constructor(id) {
        this.id = id;
    }
}

class Node {
    constructor(id) {
        this.id = id;
        this.value = null;
    }

    setValue(value) {
        this.value = value;
    }
}

class StartNode extends Node{
    constructor(id) {
        super(id);
    }
}

class EndNode extends Node{
    constructor(id) {
        super(id);
    }
}

class XOR extends Logic {
    constructor(id) {

        super(id);

        this.input = [null, null];
    }

    evalInput() {
        for (var i = 0; i < this.input; i++) {
            if (this.input[i] == null) {
                return null;
            }
        }
        var temp = [];
        for (var i = 0; i < this.input; i+2) {
            temp.append(this.input[i] ^ this.input[i+1])
        }

        return this.temp[0];
            
    }
}

class AND extends Logic {
    constructor(id) {
        super(id);
        this.input = [null, null];
    }

    evalInput() {
        for (var i = 0; i < this.input; i++) {
            if (this.input[i] == null) {
                return null;
            }
        }
        // https://stackoverflow.com/a/35568895
        this.input.every( (val, i, arr) => val === arr[0] );
    }
}



class NOT extends Logic {
    constructor(id) {
        super(id);
        this.input = null;
    }

    evalInput() {
        if (this.input != null) {
            return !this.input[0];
        }
    }
}


class Graph {
    constructor() {
        this.noofVertices = 0;
        this.AdjList = new Map();

    }

    addVertex(v){
        this.noofVertices += 1
        this.AdjList.set(v, []);
    }

    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        // remove if directed graph
        // this.AdjList.get(w).push(v);
    }

    printGraph() {
        var get_keys = this.AdjList.keys();

        for (var i of get_keys) {
            
            var get_values = this.AdjList.get(i);
            var conc = ""

            for (var j of get_values) {
                conc += j + " ";
            }

            console.log(i + " -> " + conc)
        }
    }

    // function to performs BFS
    bfs(startingNode) {

        // create a visited object
        var visited = {};

        // Create an object for queue
        var q = new Queue();

        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(startingNode);

        // loop until queue is element
        while (!q.isEmpty()) {
            // get the element from the queue
            var getQueueElement = q.dequeue();

            // passing the current vertex to callback function
            console.log(getQueueElement);

            // get the adjacent list for current vertex
            var get_List = this.AdjList.get(getQueueElement);

            // loop through the list and add the element to the
            // queue if it is not processed yet
            for (var i in get_List) {
                var neigh = get_List[i];

                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.enqueue(neigh);
                }
            }
        }
    }

};

// var ANDGate = new AND();

// Using the above implemented graph class
var g = new Graph(6);
var vertices = [new OR("1"), new NOT("2"), new OR("3"), new EndNode("4"), new StartNode("5"), new StartNode("6")];
 
// adding vertices
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i].id);
}
 
// adding edges
g.addEdge('6', '1');
g.addEdge('6', '3');
g.addEdge('5', '1');
g.addEdge('1', '2');
g.addEdge('2', '3');
g.addEdge('3', '4');

g.printGraph();

var test = new Queue();
g.bfs(6)

var orgate = new OR();
var notgate = new NOT();

console.log(notgate.evalInput())

console.log(orgate.evalInput())
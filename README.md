# dretch

> Data-Driven Fetch API

<h4 align="center">
	A small wrapper for <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">fetch</a> with data-driven approach
</h4>

## Why?

### Easier, data-driven syntax

This:

```js
const request = dretch('https://jsonplaceholder.typicode.com')

const response = await request("POST", "/todos", {
  body: { title: "Remember the milk" }
})
```

instead of this:

```js
const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json" 
  },
  body: JSON.stringify({ title: "Remember the milk" })
})
```

### Use JavaScript data structures to describe requests

```js
const request = dretch('https://jsonplaceholder.typicode.com')

const req = ['POST', '/todos', { 
  body: {
    title: "Remember the milk"
  }
}] as RequestData

const response = await request(...req)
```


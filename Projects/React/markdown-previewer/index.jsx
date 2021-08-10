marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
    return Prism.highlight(code, Prism.languages.markdown, "markdown");
  },
});

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = React.useState(placeholder);
  const [previewWindow, setPreviewWindow] = React.useState()

  const updateMarkdown = (rawMarkdown) => {
    setMarkdown(rawMarkdown);
  };

  const windowFunc =  () => {
    //Create an Or gate on click 
    console.log("We are ready!")
  }

  return (
    <div className='container '>
      <div className='editor'>
        <Toolbar icon='fa fa-marker' text='Editor' />
        <Editor
          markdown={markdown}
          onChange={(e) => {
            updateMarkdown(e.target.value);
          }}
        />
      </div>
      <div className='previewer'>
        <Toolbar
          icon='fab fa-markdown'
          text='Preview'
          iconMaximize='fas fa-expand maximizeWindow'
          titleMaximize='Maximize Window'
          onClick={windowFunc}
        />
        <Preview markdown={marked(markdown)} />
      </div>
    </div>
  );
}

//* ELEMENTS

const Toolbar = (props) => {
  return (
    <div className='toolbar'>
      <i className={props.icon}></i>
      <h3>{props.text}</h3>
      <i className={props.iconMaximize} 
      title={props.titleMaximize} 
      onClick={props.onClick}
      ></i>
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id='editor'
      onChange={props.onChange}
      type='text'
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      id='preview'
      className='preview'
      dangerouslySetInnerHTML={{ __html: props.markdown }}
    ></div>
  );
};

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(<MarkdownPreviewer />, document.getElementById("app"));

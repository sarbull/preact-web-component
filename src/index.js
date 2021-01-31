import { render, Component, h } from 'preact';

class PreactWebComponent extends Component {
    constructor() {
        super();
        // set initial time:
        this.state.time = Date.now();
    }

    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
    }

    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    render(props, state) {
        let time = new Date(state.time).toLocaleTimeString();
        return <span>{ time }</span>;
    }
}

class AnotherWebComponent extends Component {
  render(props, state) {
      return <span>AnotherWebComponent</span>;
  }
}

// // render an instance of Clock into <body>:
// // render(<Clock />, document.body);

function defineElement(Component, elementName, observedAttributes) {
  class CustomElement extends HTMLElement {
    connectedCallback() {
      const customElement = this;
      let shadowRoot = this.attachShadow({mode: 'open'});

      const props = [...this.attributes].reduce(
        (props, attribute) => ({...props, [attribute.name]: attribute.value }),
        {customElement, shadowRoot}
      );

      let instance =(<Component {...(props)}/>);

      render(instance, shadowRoot);

      this.instance = instance;
      this.props = props;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const { shadowRoot, instance, props } = this;
      if(!instance) return;

      const newProps = {...(this.props), ...({[name]: newValue})};

      console.log('test');

      const newInstance =(<Component {...(newProps)}/>);

      render(newInstance, shadowRoot);

      this.instance = newInstance;
      this.props = newProps;
    }
  }

  CustomElement.observedAttributes = observedAttributes;

  window.customElements.define(elementName, CustomElement);
}

console.log(process.env);

defineElement(PreactWebComponent, `preact-web-component-v0.0.0`, []);

defineElement(AnotherWebComponent, `another-web-component-v0.0.0`, []);


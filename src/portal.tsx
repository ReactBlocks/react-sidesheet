import * as React from "react";
import * as canUseDom from "dom-helpers/util/inDOM";
import * as ReactDOM from "react-dom";

let portalContainer: HTMLElement;

interface Props {
  children: React.ReactNode;
}

class Portal extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    // This fixes SSR
    if (!canUseDom) return;

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.setAttribute("evergreen-portal-container", "");
      document.body.appendChild(portalContainer);
    }
  }

  public static defaultProps: Props = {
    children: () => {}
  };

  public static displayName = "react-sidesheet-portal";

  el: HTMLElement = document.createElement("div");

  public componentDidMount() {
    portalContainer.appendChild(this.el);
  }

  public componentWillUnmount() {
    portalContainer.removeChild(this.el);
  }

  public render() {
    // this fixes ssr
    if (!canUseDom) return null;

    if (!this.props.children) throw new Error("children are mandatory!");

    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;

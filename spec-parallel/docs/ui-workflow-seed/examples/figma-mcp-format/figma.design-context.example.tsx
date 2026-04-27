const imgExampleAsset = "https://www.figma.com/api/mcp/asset/<asset-id>";

export default function Component() {
  return (
    <div data-node-id="<node-id>" data-name="<screen-name>">
      <p data-node-id="<text-node-id>">Example label</p>
      <img alt="" src={imgExampleAsset} />
    </div>
  );
}

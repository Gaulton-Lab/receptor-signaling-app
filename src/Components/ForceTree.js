import React from 'react';
import { ForceGraph2D } from 'react-force-graph';
import './force-graph.css';
class ForceTree extends React.Component {
    componentDidMount() {
	this.fg.zoom(2.5);
	//this.fg.d3Force('link', (node => Math.sqrt(100 / (node.level + 1)));
	//this.fg.d3Force('link').distance((links) => 55)
	//this.fg.d3Force('link').iterations(1.5);
	this.fg.d3Force('link').distance(links => links.length);
	//this.d3Force('link').distance(link => node.level === 3 ? 2 : 1, 3);
    }
    render(){
	const results = this.props.data;
	const labelswitch = this.props.label;
	return(
	<ForceGraph2D
	    ref={el => { this.fg = el; }}
	    graphData={results}
	    dagLevelDistance={0.5}
	    backgroundColor="#FFFFFF"
	    linkColor={ link => link.link_color }
	    //nodeRelSize= {2}
	    nodeVal = {node => Math.pow((node.level) === 1 ? 2 : 1,(node.state_len))}
	    //nodeVal = {node => Math.pow((node.state_len) === 1 ? 2 : 1,3)}
	    nodeId= "path"
	    nodeColor = { node => node.color }
	    // node click direct to annotations on DGA
	    //nodeLabel = {node => node.label}
	    onLinkClick={link => {if (link.link_color === '#738fc7') {window.open(`https://www.diabetesepigenome.org/search/?type=Annotation&annotation_type=variant+allelic+effects&${link.linkout}`, '_blank')}}}
	    onNodeClick={node => {if (node.level === 0) {window.open(`https://www.diabetesepigenome.org/variant-search/?${node.link}`, '_blank')} else {window.open(`https://www.diabetesepigenome.org/search/?type=Annotation&${node.link}`, '_blank')}}}
	    nodeCanvasObjectMode={node => 'after'}
	    nodeResolution = {2}
	    linkWidth = {4}
	    //linkWidth = { link => (link.width * 2) + 1 }
	    nodeCanvasObject={(node, ctx, globalScale) => {if (labelswitch === false && node.level === 2) { ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';}  else { const label = node.label; const fontSize = 14/globalScale; ctx.font = `${fontSize}px Sans-Serif`; ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'black'; ctx.fillText(label, node.x, node.y);}}}
	    nodeLabel= {node => `${node.name}`}
	    d3VelocityDecay={0.1}
	    rendererConfig={{ preserveDrawingBuffer: true }}
		/>
	);
    }
}
export default ForceTree;

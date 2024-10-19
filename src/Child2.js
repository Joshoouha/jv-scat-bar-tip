import React, { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log(this.props.data2);
    var data = this.props.data2;
    var temp_data = d3.flatRollup(data, (v) => d3.mean(v, (d) => d.tip), (d) => d.day);
    console.log('temp data: ', temp_data);

    var margin = { top: 50, bottom: 60, right: 20, left: 100 }
    var w = 600 - margin.left - margin.right;
    var h = 400 - margin.top - margin.bottom;

    var container = d3.select('.child2-svg')
                      .attr('width', w + margin.left + margin.right)
                      .attr('height', h + margin.top + margin.bottom)
                      .select('.g-2')
                      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    var x_data = temp_data.map(item => item[0]);
    const x_scale = d3.scaleBand().domain(x_data).range([0,w]).padding(0.2);

    container.selectAll('.x-axis-g2').data([0]).join('g').attr('class' ,'x-axis-g2')
    .attr('transform', `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    var y_data = temp_data.map(item => item[1]);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);

    container.selectAll('.y-axis-g2').data([0]).join('g').attr('class', 'y-axis-g2')
    .call(d3.axisLeft(y_scale));

    container.selectAll('rect').data(temp_data).join('rect')
    .attr('x', d=> x_scale(d[0]))
    .attr('width', x_scale.bandwidth())
    .attr('y', d => y_scale(d[1]))
    .attr('height', d => h-y_scale(d[1]))
    .style('fill', '#69b3a2');

    d3.select('.child2-svg').selectAll('.chart-title2').data([0]).join('text').attr('class', 'chart-title2')
      .attr('x', (w + margin.left + margin.right) / 2 + 30)
      .attr('y', 30)
      .style('text-anchor', 'middle')
      .text('Average Tip by Day');

    container.selectAll('.x-label2').data([0]).join('text').attr('class', 'x-label2')
        .attr('x', w / 2)
        .attr('y', h + 40)
        .style('text-anchor', 'middle')
        .text('Day');


    container.selectAll('.y-label2').data([0]).join('text').attr('class', 'y-label2')
        .attr('x', -(h /2))
        .attr('y', -55)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
        .text('Average Tip');
  }

  render() {
    return(
        <svg className='child2-svg'>
          <g className='g-2'></g>
        </svg>
    );
  }
}

export default Child2;
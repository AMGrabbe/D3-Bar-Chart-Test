const rectWidth = 50
const rectMargin =10
const svgHeight = 100

const conatainer = d3.select('#app')
              
const fill = {
    enter: "#FF8C64",
    update: "#FF665A",
    exit:"#7D6B7D"
}

const stroke = {
    enter: "#FF665A",
    update: "#7D6B7D",
    exit: "#FF8C64"
}

const svg = conatainer.append('svg')
    .attr('height', svgHeight)
    .attr('overflow', "visible")
    

//create div for button and code tag --> index.html line 13f
const div = conatainer.append('div')
const button = div.append('button')
    .text('Create new data!')
const numberArray = div.append('code')

function updateBars() {
  const outTransition = d3.select(svg.node()).transition().duration(1000)
  const changeTransition = d3.select(svg.node()).transition().ease(d3.easeElasticOut.amplitude(1.12).period(0.49)).duration(2000)
  
  const data = _.times(_.random(3, 8), i => _.random(1, 100))


  d3.select(svg.node()).selectAll('rect')
                .data(data, d => d)
                .join(
                    enter => {
                        return enter.append('rect')
                            .attr('x', (d, i) => i * rectWidth)
                            .attr('height',0)
                            .attr('y', svgHeight)
                            .attr('fill', fill.enter) 
                            .attr('stroke',stroke.enter)
                            .attr('stroke-width', "3px")
                    },
                    update => {
                        return update 
                        .attr('fill', fill.update) 
                        .attr('stroke',stroke.update)
                    },
                    exit => {
                        exit.attr('fill', fill.exit) 
                            .transition(outTransition)
                            .attr('stroke',stroke.exit)
                            .attr('height',0)
                            .attr('y', svgHeight)
                            .remove()
                    }
                )
                .attr('width', rectWidth - rectMargin)
                .transition(changeTransition)
                .attr('x', (d, i) => i * rectWidth)
                .attr('height', d => d)
                .attr('y', d => svgHeight - d)
                
  
  // update div with new data array:
  d3.select(numberArray.node()).text(JSON.stringify(data).replace(/\,/g, ', '))
}

updateBars()
d3.select(button.node()).on('click', updateBars)
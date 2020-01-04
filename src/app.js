import * as d3 from 'd3'

import controller from './controller'

const app = function() {
  window.app = controller
  loadData().then(() => {
    //
    const ascendingContainer = d3.select('#root')
      .append('div')
      .attr('id', '#bar__ascending')
    ascendingContainer.call(window.app.barchartAscending)
    //
    const descendingContainer = d3.select('#root')
      .append('div')
      .attr('id', '#bar__descending')
    descendingContainer.call(window.app.barchartDescending)    
  })
}

const loadData = function() {
  return new Promise((resolve, reject) => {
    d3.csv('./data.csv')
      .then(entries => {
        entries.forEach(e => {
          controller.handleAddEntry({ 
            ...e, 
            selected: false
          })
        })
        resolve(true)
      })
      .catch(error => reject(error))
  })
}

export default app

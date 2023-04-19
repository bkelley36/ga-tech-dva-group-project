/* eslint-disable */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import * as d3 from 'd3'
import * as ngraphPath from 'ngraph.path'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect } from 'react'

import HomePageHeader from '@/components/layout/HomePageHeader'
import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

import exampleImage from '../../public/images/example.png'
import multiselect from '../../public/scripts/multiselect-dropdown.js'

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='embla' ref={emblaRef}>
      <div className='embla__container'>
        <div className='embla__slide'>
          <Image src={exampleImage} width={1600} height={900} alt='example' />
        </div>
        <div className='embla__slide'>
          <Image src={exampleImage} width={1600} height={900} alt='example' />
        </div>
        <div className='embla__slide'>
          <Image src={exampleImage} width={1600} height={900} alt='example' />
        </div>
      </div>
      <span className='isolate inline-flex rounded-md shadow-sm'>
        <button
          type='button'
          onClick={scrollPrev}
          className='relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10'
        >
          <span className='sr-only'>Previous</span>
          <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
          <span>Prev</span>
        </button>
        <button
          type='button'
          onClick={scrollNext}
          className='relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10'
        >
          <span className='sr-only'>Next</span>
          <span>Next</span>
          <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </span>
    </div>
  )
}
const PlanningTool = () => {

  useEffect(() => {
    console.log("test")
  
        const mapDims = [1468, 826]
        const width = mapDims[0]
        const height = mapDims[1]
        const pathToCsv = "/data/2ndfloor_graph.csv";

        let svg = d3
            .select("span#map")
            .append("svg")
            .attr("id", "map")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", "container")
        
        let controls_div = d3
            .select("span#map")
            .append("div")
            .attr("id", "controls-div")
        let source_select = controls_div
            .append("select")
            .attr("id", "source-select")
        let target_select = controls_div
            .append("select")
            .attr("id", "target-select")
        let stops_select = controls_div
            .append("select")
            .attr("id", "stops-select")
            .attr("multiple", true)
            .attr("multiselect-search", true)
            .attr("placeholder", "Additional Stops")
            .style("width", "75px")        
        let tt = d3
            .select("span#map")
            .append('div')
            .attr('id', 'tooltip')

        const xScale = d3.scaleLinear()
            .domain([0, mapDims[0]])
            .range([0, width])

        const yScale = d3.scaleLinear()
            .domain([0, mapDims[1]])
            .range([0, height])

        const coordinate_parser = (d) => {
            const tokens = d.split(', ')
            return {
                'x': parseInt(tokens[0].split('\(').join('')),
                'y': parseInt(tokens[1].split('\(').join(''))
            }
        }

        var createGraph = require('ngraph.graph')
        const graph = createGraph()
        const exhibit_dict = {};
        const coord_dict = {}

        let pathFinder = ngraphPath.aStar(graph, {
                distance(fromNode, toNode, link) {
                    return link.data.weight;
                }
            })

        function get_path(array) {
            const final_path = [];
            const len = array.length
            for(let i = 0; i < len; i++) {
                if(i !== (len - 1)) {
                    final_path.push.apply(final_path,
                        pathFinder.find(exhibit_dict[array[i]],
                            exhibit_dict[array[(i + 1)]]))
                }
            }
            return final_path
        }

        function get_path_coords(array) {
            const coord_path = []
            for (let i = 0; i < array.length; i++) {
                let tuple=coord_dict[array[i].id].replace(/^\(|\)$/g, "").split(",")
                coord_path.push([parseInt(tuple[0]),parseInt(tuple[1])])
          }
          return coord_path
        }

        function draw_route(path_coordinates) {
            svg.append("g")
                    .attr("id", "lines")
                svg.selectAll("#lines")
                    .append("path")
                    .datum(path_coordinates)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", 4)
                    .classed("edge", true)
                    .attr("d", d3.line()
                        .x(d => xScale(d[0]))
                        .y(d => yScale(d[1]))
                    )

                 let circles = svg.append("g")
                    .attr("id", "circles")
                circles.selectAll("#circles")
                    .data(path_coordinates)
                    .enter().append("circle")
                    .attr("cx", d => xScale(d[0]))
                    .attr("cy", d => yScale(d[1]))
                    .attr("id", d => `#circle-${d[0]}-${d[1]}`)
                    .classed("node", true)
                .attr("fill", "blue")
                .attr("r", 5)
                .on("mouseenter", function() {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr("r", 15)
                })
                .on("mouseleave mouseout", function() {
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("r", 5)
                    tt.transition()
                        .duration(500)
                        .style("opacity", 0.0)
                    tt.html(``)
                })
        }

        function remove_route() {
            svg.selectAll("#lines").remove()
            svg.selectAll("#circles").remove()
        }

        d3.dsv(",", pathToCsv, function (d) {
            return {
                source: parseInt(d.source),
                target: parseInt(d.target),
                weight: parseInt(d.weight),
                coordinates_source: d.coordinates_source,
                coordinates_target: d.coordinates_target,
                exhibit_source: parseInt(d.exhibit_source),
                exhibit_target: parseInt(d.exhibit_target)
            };
        }).then(function (data) {
            data.forEach((d) => {
                let source_coordinates = coordinate_parser(d.coordinates_source)
                let target_coordinates = coordinate_parser(d.coordinates_target)
                d.coordinates_source_x = source_coordinates['x']
                d.coordinates_source_y = source_coordinates['y']
                d.coordinates_target_x = target_coordinates['x']
                d.coordinates_target_y = target_coordinates['y']
            })


            for (let i = 0; i < data.length; i ++) {
                graph.addNode(data[i].source)
                graph.addNode(data[i].target)
                graph.addLink(data[i].source, data[i].target, {
                    weight: data[i].weight
                });
                exhibit_dict[data[i].exhibit_source] = data[i].source
                coord_dict[data[i].source] = data[i].coordinates_source
            }

            // removeDuplicateNodesAndEdges(graph);

            const nested_source_exhibits = d3.nest()
                .key((d) => d.exhibit_source)
                .rollup((group) => group[0])
                .entries(data)
                .map((d) => d.key)
            const nested_target_exhibits = d3.nest()
                .key((d) => d.exhibit_target)
                .rollup((group) => group[0])
                .entries(data)
                .map((d) => d.key)

            source_select.selectAll("#source-select")
                .data(nested_source_exhibits)
                .enter().append("option")
                .attr("value", function(d) {
                    if (d !== "NaN") {
                        return d;
                    }
                })
                .text(function(d) {
                    if (d !== "NaN")
                        return d;
                })
            source_select.property("value", 205)
            target_select.selectAll("#target-select")
                .data(nested_target_exhibits)
                .enter().append("option")
                .attr("value", function(d) {
                    if (d !== "NaN") {
                        return d;
                    }
                })
                .text(function(d) {
                    if (d !== "NaN")
                        return d;
                })
            target_select.property("value", 600)
            stops_select.selectAll("#stops-select")
                .data(nested_source_exhibits)
                .enter().append("option")
                .attr("value", function(d) {
                    if (d !== "NaN") {
                        return d;
                    }
                })
                .text(function(d) {
                    if (d !== "NaN")
                        return d;
                })
            stops_select.property("value", 601)

            let submit_button = controls_div
                .append("button")
                .attr("id", "submit-button")
                .text("Re-Route")

            let best_path = get_path([source_select.property("value"), target_select.property("value")])
            let path_coordinates = get_path_coords(best_path)
            draw_route(path_coordinates)

            submit_button.on("click", function() {
                remove_route()

                let stops = d3.selectAll("#stops-select option:checked")
                    .nodes()
                    .map(option => option.value)

                let locations = []
                locations.push(source_select.property("value"))
                locations.push(target_select.property("value"))
                if (stops.length === 1 && stops[0] === '')
                    stops = []
                locations = locations.concat(stops)

                for (let i = 1; i < locations.length; i++) {
                    let best_path = get_path([locations[i - 1], locations[i]])
                    let path_coordinates = get_path_coords(best_path)
                    draw_route(path_coordinates)
                    console.log(best_path)
                }
            })
        });


  }, [])

  return (
    <span id='map'></span>
  )
}

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <HomePageHeader></HomePageHeader>
      <main id='tool'>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center py-12 text-center'>
            <h1 className='mt-4'>MET Summary Analytics:</h1>
            <EmblaCarousel></EmblaCarousel>
            <PlanningTool></PlanningTool>
          </div>
        </section>
      </main>
    </Layout>
  )
}

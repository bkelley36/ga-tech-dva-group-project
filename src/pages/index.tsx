/* eslint-disable */
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import * as d3 from 'd3'
import * as ngraphPath from 'ngraph.path'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect } from 'react'

import HomePageHeader from '@/components/layout/HomePageHeader'
import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

import dataExploration1 from '../../public/images/Data Exploration-1.png'
import dataExploration2 from '../../public/images/Data Exploration-2.png'
import dataExploration3 from '../../public/images/Data Exploration-3.png'
import dataExploration4 from '../../public/images/Data Exploration-4.png'
import dataExploration5 from '../../public/images/Data Exploration-5.png'


const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='embla pb-16' ref={emblaRef}>
      <div className='embla__container'>
        <div className='embla__slide'>
          <Image src={dataExploration1} width={1600} height={900} alt='Data Exploration 1' priority />
        </div>
        <div className='embla__slide'>
          <Image src={dataExploration2} width={1600} height={900} alt='Data Exploration 2' priority />
        </div>
        <div className='embla__slide'>
          <Image src={dataExploration3} width={1600} height={900} alt='Data Exploration 3' priority />
        </div>
        <div className='embla__slide'>
          <Image src={dataExploration4} width={1600} height={900} alt='Data Exploration 4' priority />
        </div>
        <div className='embla__slide'>
          <Image src={dataExploration5} width={1600} height={900} alt='Data Exploration 5' priority/>
        </div>
      </div>
      <span className='isolate inline-flex rounded-md shadow-sm pt-4'>
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
  
        const mapDims = [1468, 826]
        const width = mapDims[0]
        const height = mapDims[1]
        const pathToCsv = "/data/2ndfloor_graph.csv"

        let svg = d3
            .select("span#map")
            .append("svg")
            .attr("id", "map")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", "container")
            
        
        let controlsHTML = 
        `
        <div class="flex justify-center">
        <div id="source_select_div" class="px-4">
        <span class="pr-4 text-lg"><b>Starting Location:</b></span>
        </div>
        <br/>
        <div id="target_select_div" class="px-4">
        <span class="pr-4 text-lg"><b>Ending Location:</b></span>
        </div>
        </div>
        <div id="stops_select_div" class="pt-8">
        <span class="pr-4 text-lg"><b>Add stops (control click to select multiple)</b></span>

        
        </div>

        <div id="routing_button_div" class="pt-8"></div>
        `
        let controls_div = d3
            .select("span#map")
            .append("div")
            .attr("class", "py-12")
            .attr("id", "controls-div")
            .html(controlsHTML)
            
        let source_select = controls_div
            .select("div#source_select_div")
            .append("select")
            .attr("id", "source-select")
        let target_select = controls_div
            .select("div#target_select_div")
            .append("select")
            .attr("id", "target-select")
        
        let stops_select = controls_div
            .select("div#stops_select_div")
            .append("select")
            .attr("id", "stops-select")
            .attr("multiple", true)
            .attr("multiselect-search", true)
            .attr("placeholder", "Additional Stops")     
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

            var nested_source_exhibits = d3.nest()
                .key((d) => d.exhibit_source)
                .rollup((group) => group[0])
                .entries(data)
                .map((d) => +d.key)
                .sort((a, b) => a - b)
            nested_source_exhibits.shift()

            var nested_target_exhibits = d3.nest()
                .key((d) => d.exhibit_target)
                .rollup((group) => group[0])
                .entries(data)
                .map((d) => +d.key)
                .sort((a, b) => a - b)
            nested_target_exhibits.shift()

            //nested_source_exhibits = nested_source_exhibits.filter(e => e != "NaN").sort(function(a, b){return a-b})
            
            //nested_target_exhibits = nested_target_exhibits.filter(e => e != "NaN").sort(function(a, b){return a-b})

            let multiSelectOptions = nested_source_exhibits
            console.log(nested_target_exhibits)

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

            let button_class = "rounded-md bg-rose-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            let submit_button = controls_div
                .select("div#routing_button_div")
                .append("button")
                .attr("id", "submit-button")
                .attr("class", button_class)
                .text("Route")


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


const Recommender = () => {
    //given artist name or artwork title - returns matches
      //called with entry into the "Artist or Artwork Search Field"
      function match_artist(data, artistname) {
        //filtering the dataset for matches
        var matches = data.filter(
          (piece) =>
            piece.artist.toLowerCase().includes(artistname.toLowerCase()) ||
            piece.title.toLowerCase().includes(artistname.toLowerCase())
        )
        //appending matches to an array that is returned
        const title_exhibit = []
        matches.forEach((i) =>
          title_exhibit.push({
            artist: i['artist'],
            title: i['title'],
            exhibit_number: i['exhibit_number'],
            tags: i['tags'],
          })
        )
        return title_exhibit
      }

      //given artist name and artwork title - returns similar pieces using the "tags" field
      //called when a selection is made from the
      function recommend(data, artistname, title) {
        //filter for the single piece of art that matches the input
        var matches = data.filter(
          (piece) => piece.artist === artistname && piece.title === title
        )
        //pulling the description from that single art piece
        var desc
        if (matches[0]) {
           desc = matches[0]['tags'].split('|')
        } else {
            desc = []
        }

        //if the tags field has more than one desriptor: get all permutations (selected in 2s) of the descrption
        //ex: ['Men|Women|Drinking|Musicians'] -> ['Men|Women', 'Men|Drinking', 'Men|Musicians', 'Women|Drinking', 'Women|Musicians', 'Drinking|Musicians']
        //if the tags field has only one descriptor: just pull that one
        //append permutations of descriptors or single descriptor to the result variable
        if (desc.length > 1) {
          var result = desc.flatMap((v, i) =>
            desc.slice(i + 1).map((w) => v + '|' + w)
          )
        } else {
          var result = desc
        }
        //for each value in the result var: find other pieces that have tags similar to the input art piece
        var recommended = []
        for (let i = 0; i < result.length; i++) {
          //there are many pieces with Men and Women Descriptors - we wont select for that combo alone
          if (result[i] != 'Men|Women' && result[i] != 'Women|Men') {
            recommended.push(
              data.filter(
                (piece) =>
                  piece.tags.includes(result[i]) && piece.title != title
              )
            )
          }
        }
        //recommended is likely an aray of arrays of different lenghts at this point - here were flattening it to a single array of multpile art piece objects
        const recommended_merged = recommended.flat(1)
        return recommended_merged
      }

      //reading in the data
      var pathToCsv = '/data/recommendation_set.csv'
      d3.dsv(',', pathToCsv, function (d) {
        return {
          is_highlight: d.is_highlight,
          exhibit_number: parseInt(d.gallery_number),
          title: d.title,
          department: d.department,
          tags: d.tags,
          object_type: d.object_type,
          culture: d.culture,
          artist: d.artist,
          medium: d.medium,
        }
      }).then(function (data) {
        data.forEach((d) => {
          d.tags_list = d['tags'].split('|')
        })

        //running functions on input - kind of a mess, hopefully plays nice with Index.tsx

        //For Artist or Artwork Search field
        //on input into the text field
        d3.select('#user-input').on('input', function () {
          //clear the returned artists/artpieces each time there is input - else we'll have a massive list of repeats
          document.getElementById('rec_artists').innerHTML = ''
          //pulling the value from the text field as its typed
          var content = d3.select(this).property('value')
          //using that value to run match_artist
          var out_matches = match_artist(data, content)
          //for each match in out_matches (matching artist name or artpiece title)
          out_matches.forEach(function (piece) {
            //selecting the artist_list
            var artist_list = document.getElementById('rec_artists')
            //creating options to append to artist_list
            var option = document.createElement('option')
            option.value = [
              piece['title'],
              piece['artist'],
              piece['exhibit_number'],
            ].join(' - ')
            //appending to the artist list
            artist_list.append(option)
          })
        })

        //List of recommended artwork
        //after searching via "Artist or Artwork Search", making a selection, and clicking button
        document
          .getElementById('rec_button')
          .addEventListener('click', function () {
            //clear previous recommendations if already run
            document.getElementById('table-rows').innerHTML = ''
            //getting the selected value from "Artist or Artwork Search"
            let content = document
              .getElementById('user-input')
              .value.split(' - ')
            //getting the recommendation list
            let list = document.getElementById('table-rows')
            //running recommendation on the selected value from "Artist or Artwork Search"
            var recommendation = recommend(data, content[1], content[0])
            //selecting 5 recommendations randomly from the returned recommendation - dont want too many
            var rand_5 = recommendation
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
            //print to page each of the 5 recommendations
            rand_5.forEach(function (i) {
              let tr = document.createElement('tr')
              tr.className="even:bg-sky-50 w-full"
              let td = document.createElement('td')
              td.className = "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
              td.innerText = [
                i['title'],
                i['artist'],
                i['tags_list'],
                i['exhibit_number'],
              ].join('   -   ')
              tr.appendChild(td)
              list.appendChild(tr)
            })
          })
      })

    return (
        <>
    <span className="text-gray-600 text-lg self-start">Artist or Artwork Search:</span>
    <div className="w-full">
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
           type="text"
           id="user-input"
           list="rec_artists"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blueF-600 sm:text-sm sm:leading-6"
          placeholder="What are you interested in seeing?"
        />
      </div>
    </div>
      <datalist id="rec_artists"></datalist>
      <button id="rec_button" type="button" className='rounded-md bg-rose-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 my-8'>Provide Recommendation</button>
      <p className="text-xl self-start">Recommended Art Pieces:</p>
      <ul id="rec_out_list"></ul>

      <div className="mt-8 flow-root self-start text-start w-full">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead >
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    Title-Artist-Description-Exhibit Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white" id="table-rows">

              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
    )
}

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <HomePageHeader></HomePageHeader>
      <main id='tool'>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center text-center'>
            <h1 className='my-8'>MET Summary Analytics:</h1>
            <EmblaCarousel></EmblaCarousel>
            <hr className="h-px w-full my-8 bg-gray-200 border-0 dark:bg-gray-200"/>
            <h1 className='my-8'>MET Visit Routing Tool:</h1>
            <PlanningTool></PlanningTool>
            <hr className="h-px w-full my-8 bg-gray-200 border-0 dark:bg-gray-200"/>
            <h1 className='my-8'>MET Recommender:</h1>
            <Recommender></Recommender>
            <hr className="h-px w-full mt-24 mb-8 bg-gray-200 border-0 dark:bg-gray-200"/>
          </div>
        </section>
      </main>
    </Layout>
  )
}

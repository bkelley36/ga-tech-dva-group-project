import networkx as nx
import pandas as pd
import cv2
import json
import time
import numpy as np 
import screeninfo
import os


screen = screeninfo.get_monitors()

# reading in the network created previously, format: source, target, weight
network = pd.read_csv("network.csv")


# converting network for format usable with A* alg
G = nx.from_pandas_edgelist(
    network, source="source", target="target", edge_attr="weight")

# reading in node positional coordinates on png for reference
with open("coordinates.json") as json_file:
    coordinates = json.load(json_file)
new_dict = {}
for i in coordinates:
    new_value = new_value = (int(coordinates[i][0]), int(coordinates[i][1]))
    new_dict[int(i)] = new_value

# reading in dictionary relating exhibit id to node id
dict_from_csv = pd.read_csv('node_exhbit_dict.csv',
                            header=None, index_col=0, squeeze=True).to_dict()
del dict_from_csv["Exhibit"]
exhibit_dict = {int(k): int(v) for k, v in dict_from_csv.items()}

# function that takes exhibit ids, converts to node ids, and then runs through routing alg
# output node route is converted to png positions, those are then plotted on the image


def route_opt(start, finish):

    st = time.time()

    start = exhibit_dict[start]
    finish = exhibit_dict[finish]
    # print(start)
   # print(finish)

    path = nx.astar_path(G, start, finish, heuristic=None, weight="weight")
    path_coords = [new_dict[x] for x in path]

    img = cv2.imread("2nd floor.png")

    for i in range(len(path_coords)):
        (x, y) = path_coords[i]
        if i >= 1:
            cv2.line(img, (x, y), path_coords[i-1],
                     color=(0, 0, 0), thickness=2)

    for i in range(len(path_coords)):
        (x, y) = path_coords[i]
        cv2.circle(img, (x, y), radius=5, color=(255, 0, 0), thickness=-1)
        if i == 0:
            cv2.rectangle(img, (x-10, y-10), (x+10, y+10),
                          (0, 233, 0), -1)
            cv2.putText(img, "A", (x+4, y+18), cv2.FONT_HERSHEY_SIMPLEX,
                        .7, (0, 0, 0), 2)
        if i == len(path_coords)-1:
            cv2.rectangle(img, (x-10, y-10), (x+10, y+10),
                          (0, 0, 255), -1)
            cv2.putText(img, "B", (x+4, y+18), cv2.FONT_HERSHEY_SIMPLEX,
                        .7, (0, 0, 0), 2)


    et = time.time()


    elapsed = et-st
    print('Execution time:', elapsed, 'seconds')

    

    cv2.imshow('image', img)
    cv2.waitKey(0)

#testing it out: input starting exhibit and destination exhibit
route_opt(802, 612)

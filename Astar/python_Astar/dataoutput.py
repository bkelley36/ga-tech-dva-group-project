import networkx as nx
import pandas as pd
import cv2
import json
import time
import numpy as np
import screeninfo
import os

# df of source,target,edge weight
network_df = pd.read_csv("network.csv")
print("network df:")
print(network_df.head())

# dictionary of node:coordinates
with open("coordinates.json") as json_file:
    coordinates = json.load(json_file)
coords_dict = {}
for i in coordinates:
    new_value = (int(coordinates[i][0]), int(coordinates[i][1]))
    coords_dict[int(i)] = new_value
coords_df = pd.DataFrame(coords_dict.items(), columns=['node', 'coordinates'])
print("coords df")
print(coords_df.head())


# dictionary of node: exhibit
dict_from_csv = pd.read_csv('node_exhbit_dict.csv',
                            header=None, index_col=0, squeeze=True).to_dict()
del dict_from_csv["Exhibit"]
exhibit_dict = {int(k): int(v) for k, v in dict_from_csv.items()}
exhibit_df = pd.DataFrame(exhibit_dict.items(), columns=['exhibit', 'node'])
print("exhibit df")
print(exhibit_df.head())

# Creating the combined dataframe

# merging the network df and node coords df
df_cd = pd.merge(network_df, coords_df.add_suffix('_source'),
                 how='inner', left_on="source", right_on="node_source")
df_cd = pd.merge(df_cd, coords_df.add_suffix('_target'),
                 how='inner', left_on="target", right_on="node_target")
print(df_cd)
df_cd = df_cd.drop(["node_target", "node_source"], axis=1)
print(df_cd)

# merging the network,coords df with the exhibit df - many nodes are not linked to an exhibit as they were places in hallways, stairwells, etc
df_cd = pd.merge(df_cd, exhibit_df.add_suffix('_source'),
                 how='outer', left_on="source", right_on="node_source")
df_cd = pd.merge(df_cd, exhibit_df.add_suffix('_target'),
                 how='outer', left_on="target", right_on="node_target")
df_cd = df_cd.drop(["node_target", "node_source"], axis=1)
df_cd.fillna('NA', inplace=True)
df_cd.to_csv("2ndfloor_graph.csv", encoding='utf-8', index=False)

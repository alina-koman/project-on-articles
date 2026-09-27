import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

import { SideBlock } from "./SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Теги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <ListItem
            key={`${name}-${i}`}
            disablePadding
            component={Link}
            to={`/tags/${encodeURIComponent(name)}`}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <ListItemText primary={name} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};

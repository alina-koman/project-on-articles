import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const CommentsBlock = ({
  items = [],
  children,
  isLoading = true,
  error,
  emptyMessage = "Коментарів поки немає.",
}) => {
  return (
    <SideBlock title="Коментарі">
      {error ? (
        <Typography color="error" sx={{ p: 2 }}>
          {error}
        </Typography>
      ) : !isLoading && items.length === 0 ? (
        <Typography color="text.secondary" sx={{ p: 2 }}>
          {emptyMessage}
        </Typography>
      ) : (
        <List>
          {(isLoading ? [...Array(5)] : items).map((obj, index) => (
            <React.Fragment key={obj?._id || index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={
                      <>
                        <span>{obj.text}</span>
                        {obj.post && (
                          <>
                            {" · "}
                            <Link to={`/posts/${obj.post._id}`}>
                              До статті: {obj.post.title}
                            </Link>
                          </>
                        )}
                      </>
                    }
                  />
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      {children}
    </SideBlock>
  );
};

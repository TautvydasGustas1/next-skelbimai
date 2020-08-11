import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

declare module "csstype" {
  interface Properties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      "&:hover > $content": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:focus > $content, &$selected > $content": {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: "var(--tree-view-color)",
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
        backgroundColor: "transparent",
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      "& $content": {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: "inherit",
      color: "inherit",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
    },
  })
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: "100%",
      flexGrow: 1,
      maxWidth: 400,
    },
  })
);

export default function TreeCategorySelect({
  setSelectedCategoryState,
  setCategory,
}: any) {
  const classes = useStyles();

  function HandleChange(str: string, category: string) {
    setSelectedCategoryState(str);
    setCategory(category);
  }

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem
        nodeId="1"
        labelText="Elektronika"
        labelIcon={Label}
        onClick={() => HandleChange("", "")}
      >
        <StyledTreeItem
          onClick={() => HandleChange("", "")}
          nodeId="2"
          labelText="Kompiuteriai"
          labelIcon={Label}
        >
          <StyledTreeItem
            nodeId="3"
            labelText="Nesiojami kompiuteriai"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("nesiojami", "Kompiuteriai")}
          />
          <StyledTreeItem
            nodeId="4"
            labelText="Stacionarus kompiuteriai"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("stacionarus", "Kompiuteriai")}
          />
          <StyledTreeItem
            nodeId="5"
            labelText="Plansetiniai kompiuteriai"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("plansetiniai", "Kompiuteriai")}
          />
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="7"
          labelText="Isoriniai irenginiai"
          labelIcon={Label}
          onClick={() => setSelectedCategoryState("")}
        >
          <StyledTreeItem
            nodeId="8"
            labelText="Ausines"
            labelIcon={LocalOfferIcon}
            onClick={() => setSelectedCategoryState("ausines")}
          />
          <StyledTreeItem
            nodeId="9"
            labelText="Klaviaturos"
            labelIcon={LocalOfferIcon}
            onClick={() => setSelectedCategoryState("klaviaturos")}
          />
          <StyledTreeItem
            nodeId="10"
            labelText="Monitoriai"
            labelIcon={LocalOfferIcon}
            onClick={() => setSelectedCategoryState("monitoriai")}
          />
          <StyledTreeItem
            labelIcon={LocalOfferIcon}
            nodeId="11"
            labelText="Peles"
            onClick={() => setSelectedCategoryState("peles")}
          />
          <StyledTreeItem
            labelIcon={LocalOfferIcon}
            nodeId="12"
            labelText="Garso koloneles"
            onClick={() => setSelectedCategoryState("koloneles")}
          />
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="13"
          labelText="Mobilieji telefonai"
          labelIcon={LocalOfferIcon}
          onClick={() => HandleChange("mobilieji", "Telefonai")}
        />
        <StyledTreeItem
          nodeId="14"
          labelText="Televizoriai"
          labelIcon={LocalOfferIcon}
          onClick={() => setSelectedCategoryState("televizoriai")}
        />
      </StyledTreeItem>
    </TreeView>
  );
}

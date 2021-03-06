import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import Label from "@material-ui/icons/Label";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import {
  computersURL,
  externalURL,
  phonesURL,
  monitorsURL,
  consolURL,
} from "../../Utils/GlobalVariales";

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
            onClick={() => HandleChange("nesiojami", computersURL)}
          />
          <StyledTreeItem
            nodeId="4"
            labelText="Stacionarus kompiuteriai"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("stacionarus", computersURL)}
          />
          <StyledTreeItem
            nodeId="5"
            labelText="Plansetiniai kompiuteriai"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("plansetiniai", computersURL)}
          />
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="17"
          labelText="Konsoles"
          labelIcon={Label}
          onClick={() => HandleChange("", "")}
        >
          <StyledTreeItem
            nodeId="18"
            labelText="Xbox"
            labelIcon={Label}
            onClick={() => HandleChange("xbox", consolURL)}
          />
          <StyledTreeItem
            nodeId="19"
            labelText="PlayStation"
            labelIcon={Label}
            onClick={() => HandleChange("playstation", consolURL)}
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
            onClick={() => HandleChange("ausines", externalURL)}
          />
          <StyledTreeItem
            nodeId="9"
            labelText="Klaviaturos"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("klaviaturos", externalURL)}
          />
          <StyledTreeItem
            labelIcon={LocalOfferIcon}
            nodeId="11"
            labelText="Peles"
            onClick={() => HandleChange("peles", externalURL)}
          />
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="13"
          labelText="Mobilieji telefonai"
          labelIcon={LocalOfferIcon}
          onClick={() => HandleChange("mobilieji", phonesURL)}
        />
        <StyledTreeItem
          nodeId="14"
          labelText="Monitoriai"
          labelIcon={Label}
          onClick={() => HandleChange("", "")}
        >
          <StyledTreeItem
            nodeId="15"
            labelText="Monitoriai"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("monitoriai", monitorsURL)}
          />
          <StyledTreeItem
            nodeId="16"
            labelText="Televizoriai"
            labelIcon={LocalOfferIcon}
            onClick={() => HandleChange("televizoriai", monitorsURL)}
          />
        </StyledTreeItem>
      </StyledTreeItem>
    </TreeView>
  );
}

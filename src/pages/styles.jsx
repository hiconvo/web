import styled, { css } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const baseMinHeight = css`
  min-height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("footerHeight")})
  );
`;

export const baseLayout = css`
  display: grid;
  width: 100%;
  height: auto;
  ${baseMinHeight}
`;

export const ContainerSidebarRight = styled.div`
  ${baseLayout}

  grid-template-columns: minmax(0, 1fr) ${themeGet("sidebarWidth")};

  ${themeGet("media.phone")} {
    grid-template-columns: minmax(0, 1fr) 0;

    & > div:nth-child(2) {
      visibility: hidden;
    }
  }
`;

export const ContainerSidebarLeft = styled.div`
  ${baseLayout}

  grid-template-columns: ${themeGet("sidebarWidth")} minmax(0, 1fr);

  ${themeGet("media.phone")} {
    grid-template-columns: 0 minmax(0, 1fr);

    & > div:nth-child(1) {
      visibility: hidden;
    }
  }
`;

export const ContainerDualSidebars = styled.div`
  ${baseLayout}

  grid-template-columns: ${themeGet("sidebarWidth")} minmax(0, 1fr) ${themeGet(
  "sidebarWidth"
)};

  ${themeGet("media.tablet")} {
    grid-template-columns: ${props => {
      if (props.collapse === "left") {
        return "0 minmax(0, 1fr) " + themeGet("sidebarWidth")(props);
      } else {
        return themeGet("sidebarWidth")(props) + " minmax(0, 1fr) 0";
      }
    }};

    & > div:nth-child(${props => (props.collapse === "left" ? 1 : 3)}) {
      visibility: hidden;
    }
  }

  ${themeGet("media.phone")} {
    grid-template-columns: 0 minmax(0, 1fr) 0;

    & > div:nth-child(1) {
      visibility: hidden;
    }

    & > div:nth-child(3) {
      visibility: hidden;
    }
  }
`;

export const ContainerRightSidebar = styled.div`
  ${baseLayout}
  max-width: 100rem;
  margin: auto;

  grid-template-columns: minmax(0, 1fr) ${themeGet("sidebarWidth")};

  ${themeGet("media.phone")} {
    grid-template-columns: minmax(0, 1fr) 0;

    & > div:nth-child(2) {
      visibility: hidden;
    }
  }
`;

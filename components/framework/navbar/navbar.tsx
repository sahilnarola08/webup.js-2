import { KupImage, KupNavBar } from "@sme.up/ketchup-react";
import styles from "./navbar.module.scss";
import React, { useRef } from "react";
import useAppBarComponents from "../../../composable/useAppBarComponents";
import { NavBarConfiguration } from "../../../declarations/configDeclarations";

/**
 * NavBar props
 */
interface NavBarProps {
  config: NavBarConfiguration;
}

/**
 * NavBar component
 * @returns
 */
const NavBar: React.FC<NavBarProps> = ({ config }) => {
  const navbarImage = useRef("./assets/images/" + config.logo);

  // get app bar components from config
  const appBarComponents = useAppBarComponents(config.appBarComponents);

  return (
    <KupNavBar className={styles.navbar}>
      {
        (
          <div className={styles.left} slot="left">
            {appBarComponents.map(appBarComponent => {
              return appBarComponent ? appBarComponent({}) : null;
            })}
          </div>
        ) as any
      }
      <div className={styles.right} slot="right">
        <KupImage
          className={styles.logo}
          id="navbarImage"
          size-x="auto"
          size-y="100%"
          resource={navbarImage.current}
        ></KupImage>
      </div>
    </KupNavBar>
  );
};

export default NavBar;

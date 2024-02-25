import * as OBC from "openbim-components";
import * as THREE from "three";

import { FC, useEffect } from "react";

const IFCViewer: FC = () => {
  let viewer: OBC.Components;
  const creatViewer = async () => {
    viewer = new OBC.Components();

    const sceneComponent = new OBC.SimpleScene(viewer);
    sceneComponent.setup();
    viewer.scene = sceneComponent;
    const scene = sceneComponent.get();
    scene.background = null;

    const viewerContainer = document.getElementById(
      "viewer-container"
    ) as HTMLDivElement;
    const rendererComponent = new OBC.PostproductionRenderer(
      viewer,
      viewerContainer
    );
    viewer.renderer = rendererComponent;

    const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer);
    viewer.camera = cameraComponent;

    viewer.init();

    const boxMaterial = new THREE.MeshStandardMaterial({ color: "#6528D7" });
    const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    cube.position.set(0, 1.5, 0);
    scene.add(cube);
  };
  useEffect(() => {
    creatViewer();
    return () => {
      viewer.dispose();
    };
  }, []);
  return (
    <div
      id="viewer-container"
      className="ViewerContainer"
      style={{ width: 450, height: (450 * 9) / 16, position: "relative" }}
    />
  );
};
export default IFCViewer;

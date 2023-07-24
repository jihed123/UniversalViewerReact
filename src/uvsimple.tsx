import React, { useEffect, useRef, useState } from "react";
import "universalviewer/dist/uv.css";
import "universalviewer/dist/esm/index.css";

import { init } from "universalviewer";
const Uvsimple = () => {
	const uvRef = useRef<HTMLDivElement | null>(null); // Explicitly set the type and initialize to null
	const manif1 =
		"https://edsilv.github.io/test-manifests/download-service-enabled.json";
	const manif2 = "https://wellcomelibrary.org/iiif/b18035723/manifest";
	const [manifestUrl, setManifestUrl] = useState<string>(manif1);
	useEffect(() => {
		const initViewer = async () => {
			const data = {
				manifest: manifestUrl,
				embedded: true,
			};
			init("uv", data);
		};

		initViewer();
	}, [manifestUrl]);

	const handleChangeManifest = () => {
		// Check the current manifest and update to the other one
		setManifestUrl((prevUrl) => (prevUrl === manif1 ? manif2 : manif1));
	};
	return (
		<>
			<div
				className="uv"
				id="uv"
				ref={uvRef}></div>
			<button
				type="button"
				onClick={handleChangeManifest}>
				Change manifest
			</button>
		</>
	);
};

export default Uvsimple;

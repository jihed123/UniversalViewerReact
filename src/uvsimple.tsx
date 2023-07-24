import React, { useEffect, useRef, useState, useMemo } from "react";
import "universalviewer/dist/uv.css";
import "universalviewer/dist/esm/index.css";

import { init } from "universalviewer";
const Uvsimple = () => {
	const uvRef = useRef<HTMLDivElement | null>(null); // Explicitly set the type and initialize to null
	const manifestUrls = useMemo(
		() => [
			"https://edsilv.github.io/test-manifests/download-service-enabled.json",
			"https://wellcomelibrary.org/iiif/b18035723/manifest",
			"https://dms-data.stanford.edu/data/manifests/RomanCoins/bb853kn3021/manifest.json",
			"https://dms-data.stanford.edu/data/manifests/McLaughlin/bc788vp3448/manifest.json",
		],
		[]
	);

	const [currentManifestIndex, setCurrentManifestIndex] = useState<number>(0);

	useEffect(() => {
		const initViewer = async () => {
			const data = {
				manifest: manifestUrls[currentManifestIndex],
				embedded: true,
			};
			init("uv", data);
		};

		initViewer();
	}, [currentManifestIndex, manifestUrls]);

	const handleChangeManifest = () => {
		// Cycle to the next manifest in the array
		setCurrentManifestIndex((prevIndex) =>
			prevIndex === manifestUrls.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<>
			<div
				className="uv"
				id="uv"
				ref={uvRef}></div>
			<button
				type="button"
				id="changeManifestBtn"
				onClick={handleChangeManifest}>
				Change manifest
			</button>
		</>
	);
};

export default Uvsimple;

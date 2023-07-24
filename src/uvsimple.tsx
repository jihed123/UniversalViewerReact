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

	const handleNextManifest = () => {
		setCurrentManifestIndex((prevIndex) =>
			prevIndex === manifestUrls.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handlePreviousManifest = () => {
		setCurrentManifestIndex((prevIndex) =>
			prevIndex === 0 ? manifestUrls.length - 1 : prevIndex - 1
		);
	};

	return (
		<>
			<div className="container">
				<div
					className="uv"
					id="uv"
					ref={uvRef}></div>
				<div className="list-container">
					<h1>List of manifest available</h1>
					<ul className="list-manifest"></ul>
				</div>
			</div>
			<div>
				<button
					type="button"
					id="previousManifestBtn"
					onClick={handlePreviousManifest}>
					Previous
				</button>
				<button
					type="button"
					id="nextManifestBtn"
					onClick={handleNextManifest}>
					Next
				</button>
			</div>
		</>
	);
};

export default Uvsimple;

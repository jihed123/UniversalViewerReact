import React, { useEffect, useRef, useState, useMemo } from "react";
import "universalviewer/dist/uv.css";
import "universalviewer/dist/esm/index.css";

import { init } from "universalviewer";

const Uvsimple = () => {
	const uvRef = useRef<HTMLDivElement | null>(null);
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
	const [manifestTitles, setManifestTitles] = useState<string[]>([]);

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

	useEffect(() => {
		const fetchManifestTitles = async () => {
			try {
				const titles = await Promise.all(
					manifestUrls.map(async (url) => {
						const response = await fetch(url);
						const jsonObject = await response.json();
						return jsonObject.label; // Assuming the title is under the "label" property; adjust accordingly if needed.
					})
				);
				setManifestTitles(titles);
			} catch (error) {
				console.error("Error fetching manifest titles:", error);
			}
		};

		fetchManifestTitles();
	}, [manifestUrls]);

	const handleManifestChange = (index: number) => {
		setCurrentManifestIndex(index);
	};

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
					<h3>List of manifest available</h3>
					<ul className="list-manifest">
						{manifestTitles.map((title, index) => (
							<li
								key={index}
								onClick={() => handleManifestChange(index)}>
								<span>{title}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div>
				<button
					type="button"
					id="previousManifestBtn"
					className="button-manifest"
					onClick={handlePreviousManifest}>
					<span>Previous</span>
				</button>
				<button
					type="button"
					id="nextManifestBtn"
					className="button-manifest"
					onClick={handleNextManifest}>
					<span>Next</span>
				</button>
			</div>
		</>
	);
};

export default Uvsimple;

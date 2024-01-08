import React, { useState, useEffect, useRef } from "react";
import Table from "../components/Table"

const MyApp = ({initTags,initHeadlines}) => {
	console.log('init MyApp')
	console.log('init Tags',initTags)
	console.log('init Headlines',initHeadlines)


    // Function to transform the initial record
	const transformedRecords = () => {
		let transformedData = {};
		
		// Initialize a temporary array to store all headlines
		let allHeadlines = initHeadlines.map(headline => ({
			id: headline.fieldData.__ID,
			date: headline.fieldData.PubDate,
			creator: headline.fieldData.Creator,
			title: headline.fieldData.Title
		}));
	
		// Loop through each tag and find matching headlines
		initTags.forEach(tag => {
			const tagHeadlines = allHeadlines.filter(headline => 
				headline.title.includes(tag.fieldData.HeadlineName)
			);
	
			// Only add the tag if there are matching headlines
			if (tagHeadlines.length > 0) {
				transformedData[tag.fieldData.HeadlineName] = tagHeadlines;
	
				// Remove these headlines from the allHeadlines array
				allHeadlines = allHeadlines.filter(headline => 
					!tagHeadlines.includes(headline)
				);
			}
		});
	
		// Now add "Everything Else" with the remaining headlines
		transformedData["News Headlines"] = allHeadlines;
	
		return transformedData;
	};
	
	/*
	const [records, setRecords] = useState(transformedRecords());
	// Ref to hold the current state
	const currentState = useRef({ itemData, records });

	// Update the ref whenever the state changes
	useEffect(() => {
		currentState.current = { itemData, records };
	}, [itemData, records]);

	useEffect(() => {
        window.getState = () => {
			const state = currentState.current;
			const obj = {state, path: 'collectState'}
			FileMaker.PerformScript("webViewer . callbacks", JSON.stringify(obj));	
		}
        return () => {
            delete window.getState; // Clean up on unmount
        };
    }, []);

	const items = () => {
		const itemArray = itemData.Item;
		let result = itemArray.map((item) => {
		if (item.ParentRef.value === "4") {
			return { Id: item.Id, Name: item.Name, Rate: item.UnitPrice };
		}
		return null;
		}).filter(item => item !== null); // Filter out null values
		return result;
	};
	*/

	return (
		<>
		<Table data={transformedRecords()} />
		</>
	);
};

export default MyApp;

import { InferGetStaticPropsType } from "next";
import { About, Hero, Leadership } from "../sections/index";
import { Footer } from "../shared/components";
import { ConfigContext, HomeContext } from "../utils/contexts";
import { DocumentType, fetchData } from "../utils/prismic";
import { Config, Home as HomeType } from "../utils/types";

export default function Home({
	config,
	home,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<ConfigContext.Provider value={config}>
			<HomeContext.Provider value={home}>
				<div>
					<Hero />
					<About />
					<Leadership />
					<Footer />
				</div>
			</HomeContext.Provider>
		</ConfigContext.Provider>
	);
}

export async function getStaticProps() {
	const config = await fetchData(DocumentType.Config);
	const home = await fetchData(DocumentType.Home);

	return {
		props: { config: config as Config, home: home as HomeType }, // will be passed to the page component as props
	};
}

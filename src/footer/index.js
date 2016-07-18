import React, { Component } from 'react'
import { footer, wrap, credit, creditTitle, creditCite } from './index.css'

export class Footer extends Component {
	render(){
		return (
			<footer className={footer}>
				<div className={wrap}>
					<span className={credit}>
						<span className={creditTitle}>Map tiles</span>
						<span className={creditCite}>© OpenStreetMap contributors</span>
					</span>
					<span className={credit}>
						<span className={creditTitle}><a href="mailto:information@planning.nsw.gov.au?subject=Mapping%20the%20NSW%20Budget">Contact</a></span>
					</span>
					<span className={credit}>
						<span className={creditTitle}><a href="http://data.nsw.gov.au/data/dataset/nsw-budget-paper-2" target="_blank">Budget data</a></span>
						<span className={creditCite}>
							<a rel="license" target="_blank" style={{marginRight:3}} href="http://creativecommons.org/licenses/by/3.0/au/">
								<img alt="Creative Commons Licence" style={{borderWidth:0,verticalAlign:"middle"}} src="https://i.creativecommons.org/l/by/3.0/au/80x15.png" />
							</a>
							NSW Treasury
						</span>
					</span>
					<span className={credit}>
						<span className={creditTitle}>Visualisation</span>
						<span className={creditCite}>Arup</span>
					</span>
				</div>
			</footer>
		)
	}
}

export default Footer

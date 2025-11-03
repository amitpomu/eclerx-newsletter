import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Panel, PanelBody, Button } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import image from "./eclerx-image.png";

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;

	const clearImage = (e) => {
		e.preventDefault();
		setAttributes({ featuredImageUrl: "#" });
	}

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting">
				<Panel>
					<PanelBody
						title={__("eClerx Newsletter Settings", "eclerx")}
						initialOpen={true}
					>
						<fieldset>
							<label className="inspector-control-label">
								{__("Select Featured Image", "eclerx")}
							</label>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(image) => {
										setAttributes({ featuredImageUrl: image.url });
									}}
									allowedTypes="image"
									value={attributes.featuredImageUrl}
									render={({ open }) => (
										<Fragment>
											{"#" !== attributes.featuredImageUrl ? (
												<Fragment>
												<img
													onClick={open}
													src={attributes.featuredImageUrl}
													className="eclerx-image-control"
												/>
												<a className="clear-image-link" onClick={clearImage}>{__("Set to default image", "eclerx")}</a>
												</Fragment>
											) : (
												<Button onClick={open} variant="secondary" isLarge>
													{__("Select or Upload Image", "eclerx")}
												</Button>
											)}
										</Fragment>
									)}
								/>
							</MediaUploadCheck>
						</fieldset>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className="eclerx-newsletter-wrapper">
				<div className="eclerx-column">
					<div className="eclerx-newsletter-label">
						<RichText
							tagName="h2"
							className="eclerx-title"
							value={attributes.title}
							allowedFormats={["core/bold", "core/italic", "core/link"]}
							onChange={(title) => setAttributes({ title })}
						/>
						<RichText
							tagName="p"
							className="eclerx-description"
							value={attributes.description}
							allowedFormats={["core/bold", "core/italic", "core/link"]}
							onChange={(description) => setAttributes({ description })}
						/>
					</div>
					<form id="eclerx-newsletter">
						<div className="eclerx-row">
							<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
								<input
									type="text"
									id="firstname"
									name="firstname"
									value={__("Your Firstname", "eclerx")}
									disabled
								/>
							</div>

							<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
								<input
									type="text"
									id="surname"
									name="surname"
									value={__("Your Surname", "eclerx")}
									disabled
								/>
							</div>
						</div>

						<div className="eclerx-row">
							<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
								<input
									type="email"
									id="email"
									name="email"
									value={__("Your Email", "eclerx")}
									disabled
								/>
							</div>

							<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
								<button type="submit" disabled>
									{__("Sign up", "eclerx")}
								</button>
							</div>
						</div>
					</form>
					<div className="eclerx-newsletter-info">
						<RichText
							tagName="span"
							className="eclerx-caption"
							value={attributes.caption}
							allowedFormats={["core/bold", "core/italic", "core/link"]}
							onChange={(caption) => setAttributes({ caption })}
						/>
					</div>
				</div>
				<div className="eclerx-column">
					<img
						className="featured-image"
						src={
							attributes.featuredImageUrl &&
							attributes.featuredImageUrl.trim() !== "#"
								? attributes.featuredImageUrl
								: image
						}
						alt={__("featured image", "eclerx")}
					/>
				</div>
			</div>
		</div>
	);
}

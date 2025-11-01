import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
} from "@wordpress/block-editor";
import image from "./eclerx-image.png";

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

	return (
		<div {...useBlockProps()}>
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
					<img className="featured-image" src={image} alt={__("featured image", "eclerx")}/>
				</div>
			</div>
		</div>
	);
}

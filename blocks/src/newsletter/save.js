import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save(props) {
	const { attributes } = props;
	return (
		<div {...useBlockProps.save({ className: `eclerx-newsletter-block` })}>
			<div className="eclerx-newsletter-wrapper">
				<div className="eclerx-newsletter-label">
					<InnerBlocks.Content />
				</div>
				<form id="eclerx-newsletter" noValidate>
					<input
						type="text"
						name="safename"
						id="safename"
						value=""
						className="eclerx-safe"
						aria-hidden="true"
					/>
					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<input
								type="text"
								id="firstname"
								name="firstname"
								placeholder={__("Your Firstname", "eclerx")}
								aria-describedby="firstname-error"
								aria-invalid="false"
								required
							/>
							<span
								id="firstname-error"
								className="eclerx-error"
								role="alert"
							></span>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<input
								type="text"
								id="surname"
								name="surname"
								placeholder={__("Your Surname", "eclerx")}
								aria-describedby="surname-error"
								aria-invalid="false"
							/>
							<span
								id="surname-error"
								className="eclerx-error"
								role="alert"
							></span>
						</div>
					</div>

					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Your Email"
								aria-describedby="email-error"
								aria-invalid="false"
								required
							/>
							<span
								id="email-error"
								className="eclerx-error"
								role="alert"
							></span>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<button type="submit">{__("Sign up", "eclerx")}</button>
						</div>
					</div>
				</form>

				<div className="eclerx-newsletter-info">
					<RichText.Content className="eclerx-caption" tagName="span" value={attributes.caption} />
					<span id="eclerx-info-message" data-status=""></span>
				</div>
			</div>
		</div>
	);
}

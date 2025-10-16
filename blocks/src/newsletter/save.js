import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save() {
	return (
		<div {...useBlockProps.save({ className: `eclerx-newsletter-block` })}>
			<div className="eclerx-newsletter-wrapper">
				<div className="eclerx-newsletter-label">
					<InnerBlocks.Content />
				</div>
				<form id="eclerx-newsletter" noValidate>
					<input type="text" name="safename" id="safename" value="" className="eclerx-safe" aria-hidden="true" />
					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<label htmlFor="firstname">{__("First Name", "eclerx")}</label>
							<input
								type="text"
								id="firstname"
								name="firstname"
								placeholder={__("John", "eclerx")}
								aria-describedby="firstname-error"
								aria-invalid="false"
								required
							/>
							<span id="firstname-error" className="eclerx-error" role="alert"></span>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<label htmlFor="surname">{__("Sur Name", "eclerx")}</label>
							<input
								type="text"
								id="surname"
								name="surname"
								placeholder={__("Doe", "eclerx")}
								aria-describedby="surname-error"
								aria-invalid="false"
							/>
							<span id="surname-error" className="eclerx-error" role="alert"></span>
						</div>
					</div>

					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<label htmlFor="email">{__("Email", "eclerx")}</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="john.doe@example.com"
								aria-describedby="email-error"
								aria-invalid="false"
								required
							/>
							<span id="email-error" className="eclerx-error" role="alert"></span>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<button type="submit">
								{__("Submit", "eclerx")}
							</button>
						</div>
					</div>
				</form>

				<div className="eclerx-newsletter-info">
					<span id="eclerx-info-message" data-status=""></span>
				</div>
			</div>
		</div>
	);
}

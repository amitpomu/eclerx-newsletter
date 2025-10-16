import { __ } from "@wordpress/i18n";
import { useInnerBlocksProps, useBlockProps } from "@wordpress/block-editor";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const ALLOWED_BLOCKS = [];
	const TEMPLATE = [
		[
			"core/heading",
			{
				content: __("Subscribe to Our Newsletter", "eclerx"),
				level: 3,
				style: {
					spacing: {
						margin: {
							top: "0",
							bottom: "0",
						},
					},
				},
			},
		],
		[
			"core/paragraph",
			{
				content: __(
					"Keep in touch with our latest projects, announcements, and valuable insights.",
					"eclerx",
				),
			},
		],
	];

	const blocksProps = useBlockProps({ className: `eclerx-newsletter-block` });
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blocksProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: "horizontal",
	});

	return (
		<div {...innerBlocksProps}>
			<div className="eclerx-newsletter-wrapper">
				<div className="eclerx-newsletter-label">{children}</div>
				<form id="eclerx-newsletter">
					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<label htmlFor="firstname">{__("First Name", "eclerx")}</label>
							<input
								type="text"
								id="firstname"
								name="firstname"
								value={__("John", "eclerx")}
								disabled
							/>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<label htmlFor="firstname">{__("Sur Name", "eclerx")}</label>
							<input
								type="text"
								id="surname"
								name="surname"
								value={__("Doe", "eclerx")}
								disabled
							/>
						</div>
					</div>

					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<label htmlFor="email">{__("Email", "eclerx")}</label>
							<input
								type="email"
								id="email"
								name="email"
								value="john.doe@example.com"
								disabled
							/>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<button type="submit" disabled>
								{__("Submit", "eclerx")}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}


type Strategy = 1 | 2 | 3

export interface Parameter {
  include_datasets: Array<number>,
  include_train_datasets: Array<number>,
  include_validation_datasets: Array<number>,
  include_test_datasets: Array<number>,
  exclude_datasets: Array<number>,
  include_classes: Array<string>,
  exclude_classes: Array<string>,
  strategy: Strategy,
  extra_url: string,
  labellers: Array<string>,
  keep_annotations: boolean,
  network: string,
  backbone: string,
  model_id: number,
  mining_algorithm: string,
  top_k: number,
  generate_annotations: boolean,
  docker_image: number,
}